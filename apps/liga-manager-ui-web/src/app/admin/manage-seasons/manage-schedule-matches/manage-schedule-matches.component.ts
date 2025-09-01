import { Component, inject, OnInit } from '@angular/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { PitchService } from '@liga-manager-ui/services';
import { PitchAutoCompleteComponent, TeamChooserComponent } from '@liga-manager-ui/components';
import { MatInputModule } from '@angular/material/input';
import { MatchAppointment, Team } from '@liga-manager-api/graphql';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import dayjs from 'dayjs';
import { MatButtonModule } from '@angular/material/button';

class MatchAppointmentFormGroup extends FormGroup {

    constructor() {
        super({
            pitch: new FormControl(null, [ Validators.required ]),
            time: new FormControl(null, [ Validators.required ]),
            unavailableTeams: new FormControl<Team[]>([]),
            daysOffset: new FormControl(0),
        })
    }

}

@Component({
    selector: 'lima-manage-schedule-matches',
    standalone: true,
    imports: [MatButtonModule, CustomDatePipe, MatCardModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, TranslateModule, AsyncPipe, PitchAutoCompleteComponent, MatInputModule, TeamChooserComponent],
    templateUrl: './manage-schedule-matches.component.html',
})
export class ManageScheduleMatchesComponent extends ManageSeasonBaseComponent implements OnInit {

    pitchService = inject(PitchService);

    matchAppointments?: FormArray<MatchAppointmentFormGroup>;

    ngOnInit(): void {
        this.matchAppointments = new FormArray(
            Array.from({ length: this.season?.match_days![0]?.matches?.length || 0 }, () => new MatchAppointmentFormGroup()),
        );
    }

    calcOffestFromStartDate(offset: number) {
        return dayjs.utc(this.season?.match_days![0]?.start_date).add(offset, 'days').format('dddd')
    }

    exampleMatchDays() {
        if (!this.season?.match_days) {
            return;
        }
        return this.season?.match_days.map(
            (matchDay) => ({
                ...matchDay,
                matches: matchDay?.matches?.map(
                    (match, i) => ({
                        ...match,
                        pitch: this.matchAppointments?.controls[i].controls['pitch'].value,
                        kickoff: this.genKickoff(
                            matchDay.start_date,
                            this.matchAppointments?.controls[i].controls['daysOffset'].value,
                            this.matchAppointments?.controls[i].controls['time'].value,
                        ).toDate(),

                    }),
                ),
            }),
        );
    }

    genKickoff(matchDayStartDate: string, offset: number, time: `${number}:${number}`) {
        const h = +time.split(':')[0];
        const m = +time.split(':')[1];
        return dayjs.utc(matchDayStartDate).add(offset, 'days').hour(h).minute(m);
    }

    async scheduleAllMatchesForMatchDay(matchDayIndex: number) {
        const matchDay = this.season?.match_days![matchDayIndex];
        if (!matchDay) { 
            return;
        }
        const match_appointments: MatchAppointment[] = this.matchAppointments?.controls.map(
            (fg) => ({
                kickoff: this.genKickoff(
                    matchDay.start_date,
                    fg.controls['daysOffset'].value,
                    fg.controls['time'].value,
                ).toDate(),
                pitch_id: fg.controls['pitch'].value.id,
                unavailable_team_ids: fg.controls['unavailableTeams'].value.map((t: Team) => t.id),
            }),
        ) || [];
        await this.seasonService.scheduleAllMatchesForMatchDay({
            match_day_id: matchDay.id,
            match_appointments,
        }, this.season?.id);
    }

    async scheduleAllMatchesForSeason() {
        const matchDay = this.season?.match_days![0];
        if (!matchDay) { 
            return;
        }
        const match_appointments: MatchAppointment[] = this.matchAppointments?.controls.map(
            (fg) => ({
                kickoff: this.genKickoff(
                    matchDay.start_date,
                    fg.controls['daysOffset'].value,
                    fg.controls['time'].value,
                ).toDate(),
                pitch_id: fg.controls['pitch'].value.id,
                unavailable_team_ids: fg.controls['unavailableTeams'].value.map((t: Team) => t.id),
            }),
        ) || [];
        await this.seasonService.scheduleAllMatchesForSeason({
            season_id: this.season?.id || '',
            match_appointments,
        });
    }

}
