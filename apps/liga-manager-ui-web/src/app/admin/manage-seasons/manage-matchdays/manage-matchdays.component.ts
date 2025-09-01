import { Component, DestroyRef, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatchDay, Maybe, SeasonFragment } from '@liga-manager-api/graphql';
import dayjs from 'dayjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CalendarService, NotificationService } from '@liga-manager-ui/services';
import { MatButtonModule } from '@angular/material/button';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BehaviorSubject, switchMap } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { v4 } from 'uuid';

import utc from 'dayjs/plugin/utc';
import { CustomDatePipe } from '@liga-manager-ui/pipes';

dayjs.extend(utc);

@Component({
    selector: 'lima-manage-matchdays',
    standalone: true,
    imports: [
        TranslateModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        CustomDatePipe,
        MatCardModule,
        MatButtonModule,
        CypressSelectorDirective,
        FullCalendarModule,
        AsyncPipe,
        MatCheckboxModule,
    ],
    templateUrl: './manage-matchdays.component.html',
})
export class ManageMatchdaysComponent extends ManageSeasonBaseComponent implements OnInit, OnChanges {

    formGroup = new FormGroup({
        seasonStartDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
        secondHalf: new FormControl(false),
        betweenMatchDaysOffset: new FormControl<number>(7, { nonNullable: true }),
        fromToOffset: new FormControl<number>(2, { nonNullable: true }),
    })

    matchDays = signal<Maybe<MatchDay>[]>([]);

    private translateService = inject(TranslateService);

    private notificationService = inject(NotificationService);

    private calendarService = inject(CalendarService);

    private destroyRef = inject(DestroyRef);

    calendarOptions: CalendarOptions = {
        timeZone: 'UTC',
        headerToolbar: {
            start: 'dayGridMonth,dayGridYear',
            center: 'title',
            end: 'today prev,next',
        },
        footerToolbar: {
            end: 'today prev,next',
        },
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin ],
        firstDay: 1,
        contentHeight: 'auto',
        editable: true,
        eventDrop: this.eventDrop.bind(this),
    }

    matchDayTrigger = new BehaviorSubject<Maybe<MatchDay>[]>([])

    events$ = this.matchDayTrigger.pipe(
        switchMap(
            (matchDays) => this.calendarService.getEvents(matchDays, true),
        ),
    );

    ngOnInit(): void {
        this.formGroup.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            () => {
                this.createMatchDays();
            },
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['season']) {
            if (this.season?.match_days) {
                this.matchDays.set(this.season?.match_days)
            } else {
                this.matchDays.set([]);
            }
            this.matchDayTrigger.next(this.matchDays());
        }
    }

    createMatchDays() {
        if (this.season?.teams) {
            this.matchDays.set([]);
            let length = this.season.teams.length;
            if (length % 2 !== 0) {
                length += 1;
            }
            if (this.formGroup.controls.secondHalf.value) {
                length = (length * 2) - 1;
            }
            for (let i = 0; i < length - 1; i++) {

                const md = {} as MatchDay;
                md.id = v4();
                md.start_date = dayjs.utc(this.formGroup.controls.seasonStartDate.value).add(i * this.formGroup.controls.betweenMatchDaysOffset.value, 'day').toJSON();
                md.end_date = dayjs.utc(md.start_date).add(this.formGroup.controls.fromToOffset.value, 'day').toJSON();
                md.number = i + 1;
                this.matchDays().push(md);
            }
            this.matchDayTrigger.next(this.matchDays());
        }
    }

    async saveMatchDays(manageSeason: SeasonFragment, mode: 'create' | 'update') {
        try {
            const dates = this.matchDays()?.map((m) => ({ from: dayjs.utc(m?.start_date).toDate(), to: dayjs.utc(m?.end_date).toDate() }));
            if (mode === 'create') {
                await this.seasonService.createMatchesForSeason({
                    season_id: manageSeason.id,
                    dates,
                });
            }
            if (mode === 'update') {
                for (const md of this.matchDays()) {
                    await this.seasonService.rescheduleMatchDay({
                        match_day_id: md?.id || '',
                        date_period: { from: dayjs.utc(md?.start_date).toDate(), to: dayjs.utc(md?.end_date).toDate() },
                    }, manageSeason.id);
                }
            }
            this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_MATCH_DAYS_SUCCESS'));
        } catch (error) {
            console.error(error);
        }
    }

    eventDrop(event: EventDropArg) {

        const matchDayIndex = event.event._def.extendedProps['matchDayIndex'];
        const updatedDates: MatchDay[] = [];

        for (const matchDay of this.matchDays()) {
            if (matchDay) {
                if (matchDay.number  <= matchDayIndex) {
                    continue;
                }
                const updatedDate = {
                    ...matchDay,
                    start_date: dayjs.utc(matchDay?.start_date).add(event.delta.days, 'days').toJSON(),
                    end_date: dayjs.utc(matchDay?.end_date).add(event.delta.days, 'days').toJSON(),
                }
                updatedDates.push(updatedDate)
            }
        }
        this.matchDays.update(
            (old) => {
                return old.slice(0, matchDayIndex).concat(updatedDates)
            },
        );
        this.matchDayTrigger.next(this.matchDays());
    }

}
