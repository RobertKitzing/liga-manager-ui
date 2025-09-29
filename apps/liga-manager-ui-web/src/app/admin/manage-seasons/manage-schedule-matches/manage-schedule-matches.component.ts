import { Component, inject, OnInit } from '@angular/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { PitchService } from '@liga-manager-ui/services';
import { PitchAutoCompleteComponent, TeamChooserComponent, DateTimeComponent } from '@liga-manager-ui/components';
import { MatInputModule } from '@angular/material/input';
import { Team } from '@liga-manager-api/graphql';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { MatButtonModule } from '@angular/material/button';
import { add, formatISO, parseISO, set } from 'date-fns';
import { firstValueFrom } from 'rxjs';
import { TZDate } from '@date-fns/tz';
import { select } from '@ngxs/store';
import { AppSettingsSelectors } from '@liga-manager-ui/states';

class MatchAppointmentFormGroup extends FormGroup {

    constructor() {
        super({
            pitch: new FormControl(null, [ Validators.required ]),
            time: new FormControl(null, [ Validators.required ]),
            unavailableTeams: new FormControl<Team[]>([]),
            daysOffset: new FormControl(0),
        });
    }

}

@Component({
    selector: 'lima-manage-schedule-matches',
    standalone: true,
    imports: [
        MatButtonModule,
        CustomDatePipe,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        AsyncPipe,
        PitchAutoCompleteComponent,
        MatInputModule,
        TeamChooserComponent,
        DateTimeComponent,
    ],
    templateUrl: './manage-schedule-matches.component.html',
})
export class ManageScheduleMatchesComponent extends ManageSeasonBaseComponent implements OnInit {

    localTimeZone = select(AppSettingsSelectors.localTimeZone);

    pitchService = inject(PitchService);

    matchAppointments?: FormArray<MatchAppointmentFormGroup>;

    ngOnInit(): void {
        this.matchAppointments = new FormArray(
            Array.from({ length: this.season?.match_days![0]?.matches?.length || 0 }, () => new MatchAppointmentFormGroup()),
        );
    }

    calcOffestFromStartDate(offset: number) {
        return add(parseISO(this.season?.match_days![0]?.start_date || ''), { days: offset });
    }

    exampleMatchDays() {
        if (!this.season?.match_days) {
            return;
        }
        const t = this.season?.match_days.map(
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
                        ),
                    }),
                ),
            }),
        );
        return t;
    }

    genKickoff(matchDayStartDate: string, offset: number, time: `${number}:${number}`) {
        const hours = +time.split(':')[0];
        const minutes = +time.split(':')[1];
        const startDate = new TZDate(parseISO(matchDayStartDate), this.localTimeZone());
        const kickoffDate = new TZDate(set(add(startDate, { days: offset }), { hours, minutes }), this.localTimeZone());
        return formatISO(kickoffDate);
    }

    async scheduleAllMatchesForMatchDay(matchDayIndex: number) {
        const matchDay = this.season?.match_days![matchDayIndex];
        if (!matchDay) {
            return;
        }
        const match_appointments = this.matchAppointments?.controls.map(
            (fg) => ({
                kickoff: this.genKickoff(
                    matchDay.start_date,
                    fg.controls['daysOffset'].value,
                    fg.controls['time'].value,
                ),
                pitch_id: fg.controls['pitch'].value.id,
                unavailable_team_ids: fg.controls['unavailableTeams'].value.map((t: Team) => t.id),
            }),
        ) || [];
        await firstValueFrom(this.seasonService.scheduleAllMatchesForMatchDay({
            match_day_id: matchDay.id,
            match_appointments,
        }, this.season?.id));
    }

    async scheduleAllMatchesForSeason() {
        const matchDay = this.season?.match_days![0];
        if (!matchDay) {
            return;
        }
        const match_appointments = this.matchAppointments?.controls.map(
            (fg) => ({
                kickoff: this.genKickoff(
                    matchDay.start_date,
                    fg.controls['daysOffset'].value,
                    fg.controls['time'].value,
                ),
                pitch_id: fg.controls['pitch'].value.id,
                unavailable_team_ids: fg.controls['unavailableTeams'].value.map((t: Team) => t.id),
            }),
        ) || [];

        await firstValueFrom(this.seasonService.scheduleAllMatchesForSeason({
            season_id: this.season?.id || '',
            match_appointments,
        }));
    }

}
