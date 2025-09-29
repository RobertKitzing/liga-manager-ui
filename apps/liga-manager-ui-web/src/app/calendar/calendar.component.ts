import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, effect, inject, input, OnInit, ViewChild } from '@angular/core';
import { CalendarQueryVariables } from '@liga-manager-api/graphql';
import {
    FullCalendarComponent,
    FullCalendarModule,
} from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { CalendarService, I18nService, ShareService } from '@liga-manager-ui/services';
import { firstValueFrom, Subject, switchMap, tap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { defaultDialogConfig, MatchComponent } from '@liga-manager-ui/components';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptionsComponent, CalendarOptionsFormGroup } from './calendar-options/calendar-options.component';
import { Share } from '@capacitor/share';
import { dispatch, select } from '@ngxs/store';
import { SelectedItemsSelectors, SetSelectedCalendarTeamIds } from '@liga-manager-ui/states';

@Component({
    selector: 'lima-calendar',
    templateUrl: './calendar.component.html',
    imports: [
        AsyncPipe,
        FullCalendarModule,
        MatToolbarModule,
        MatchComponent,
        MatIcon,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslateModule,
        MatInputModule,
    ],
    standalone: true,
})
export class CalendarComponent implements OnInit, AfterViewInit {

    private i18nService = inject(I18nService);

    private calendarService = inject(CalendarService);

    private translateService = inject(TranslateService);

    canShare = Share.canShare();

    teamIdsLS = select(SelectedItemsSelectors.selectedCalendarTeamIds);

    private dispatchTeamIds = dispatch(SetSelectedCalendarTeamIds);

    private shareService = inject(ShareService);

    team_ids = input<string>();

    private dialog = inject(MatDialog);

    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

    selectedSeasonFC = new FormControl();

    eventTrigger = new Subject<CalendarQueryVariables>();

    options = new CalendarOptionsFormGroup(this.teamIdsLS());

    calendarOptions: CalendarOptions = {
        contentHeight: 'auto',
        headerToolbar: {
            start: '',
            center: 'title',
            end: '',
        },
        initialView: this.options.controls['selectedView'].value,
        plugins: [dayGridPlugin, listPlugin],
        duration: {
            [this.options.controls['duration'].controls.type.value]: this.options.controls.duration.controls.value.value,
        },
        firstDay: 1,
        editable: false,
        datesSet: this.viewChanged.bind(this),
    };

    calendarApi!: Calendar;

    events$ = this.eventTrigger.pipe(
        switchMap((params) =>
            this.calendarService.getCalendarEvents(params).pipe(
                tap((events) => {
                    this.calendarOptions.events = this.options.controls.team_ids.value?.length > 0
                        ?
                        events.filter(
                            (event) => {
                                return (event.team_ids?.filter((et) => this.options.controls.team_ids.value.includes(et)) || []).length > 0;
                            },
                        )
                        :
                        events;
                }),
            ),
        ),
    );

    private destroyRef = inject(DestroyRef);

    constructor(
    ) {
        effect(
            () => {
                if (this.team_ids()) {
                    this.options.controls.team_ids.setValue(this.team_ids()?.split(',') || []);
                }
            },
        );
    }

    ngOnInit() {
        this.refresh();
        this.calendarOptions.locale = this.i18nService.currentLang;
        this.translateService.onLangChange.subscribe((lang) => this.calendarOptions.locale = lang.lang);
        this.options.controls.selectedView.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (view) => {
                this.calendarApi.changeView(view);
            },
        );
        this.options.controls.duration.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            () => {
                this.updateDuration();
            },
        );
        this.options.controls.team_ids.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            () => {
                this.triggerEvent();
                this.dispatchTeamIds(this.options.controls.team_ids.value.join(','));
            },
        );
    }

    async refresh(event?: Subject<void>) {
        await firstValueFrom(this.calendarService.reloadEvents());
        event?.next();
    }

    triggerEvent() {
        this.eventTrigger.next({
            min_date: this.calendarApi?.view.activeStart.toJSON(),
            max_date: this.calendarApi?.view.activeEnd.toJSON(),
        });
    }

    ngAfterViewInit() {
        this.calendarApi = this.calendarComponent.getApi();
        this.triggerEvent();
    }

    viewChanged() {
        this.calendarApi = this.calendarComponent.getApi();
        this.triggerEvent();
    }

    prev() {
        this.calendarApi.prev();
    }

    updateDuration() {
        this.calendarApi.setOption('duration', {
            [this.options.controls.duration.controls.type.value]: this.options.controls.duration.controls.value.value,
        });
    }

    next() {
        this.calendarApi.next();
    }

    today() {
        this.calendarApi.today();
    }

    openSettings() {
        this.dialog.open(CalendarOptionsComponent, {
            ...defaultDialogConfig,
            data: {
                options: this.options,
            },
        });
    }

    share() {
        this.shareService.shareCalendar(this.options.controls.team_ids.value.join(','));
    }

}
