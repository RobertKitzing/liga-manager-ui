import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { CalendarQueryVariables } from '@liga-manager-api/graphql';
import {
    FullCalendarComponent,
    FullCalendarModule,
} from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { CalendarService, I18nService } from '@liga-manager-ui/services';
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
import { CalendarOptionsComponent } from './calendar-options/calendar-options.component';
import { Share } from '@capacitor/share';
import { Store } from '@ngxs/store';
import { SelectedItemsSelectors } from '@liga-manager-ui/states';

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

    private dialog = inject(MatDialog);

    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

    selectedSeasonFC = new FormControl();

    eventTrigger = new Subject<{ dates: CalendarQueryVariables, teamIds: string[]}>();

    private store = inject(Store);


    calendarOptions: CalendarOptions = {
        contentHeight: 'auto',
        headerToolbar: {
            start: '',
            center: 'title',
            end: '',
        },
        initialView: this.store.selectSnapshot(SelectedItemsSelectors.selectedCalendarOptions).selectedView || 'list',
        plugins: [dayGridPlugin, listPlugin],
        firstDay: 1,
        editable: false,
    };

    calendarApi!: Calendar;

    events$ = this.eventTrigger.pipe(
        switchMap((params) =>
            this.calendarService.getCalendarEvents(params.dates).pipe(
                tap((events) => {
                    this.calendarOptions.events = params.teamIds.length > 0
                        ?
                        events.filter(
                            (event) => {
                                return (event.team_ids?.filter((et) => params.teamIds.includes(et)) || []).length > 0;
                            },
                        )
                        :
                        events;
                }),
            ),
        ),
    );

    private destroyRef = inject(DestroyRef);

    ngOnInit() {
        this.refresh();
        this.calendarOptions.locale = this.i18nService.currentLang;
        this.translateService.onLangChange.subscribe((lang) => this.calendarOptions.locale = lang.lang);
    }

    async refresh(event?: Subject<void>) {
        await firstValueFrom(this.calendarService.reloadEvents());
        event?.next();
    }

    triggerEvent() {
        const teamIds = this.store.selectSnapshot(SelectedItemsSelectors.selectedCalendarOptions).teamIds || [];
        this.eventTrigger.next({
            dates: {
                min_date: this.calendarApi?.view.activeStart.toJSON(),
                max_date: this.calendarApi?.view.activeEnd.toJSON(),
            },
            teamIds,
        });
    }

    ngAfterViewInit() {
        this.calendarApi = this.calendarComponent.getApi();
        this.store.select(SelectedItemsSelectors.selectedCalendarOptions).pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (options) => {
                if (options.selectedView) {
                    this.calendarApi?.changeView(options.selectedView);
                }
                if (options.duration) {
                    this.calendarApi.setOption('duration', {
                        [options.duration.type!]: options.duration.value,
                    });
                }
                this.triggerEvent();
            },
        );
    }

    prev() {
        this.calendarApi.prev();
        this.triggerEvent();
    }

    next() {
        this.calendarApi.next();
        this.triggerEvent();
    }

    today() {
        this.calendarApi.today();
        this.triggerEvent();
    }

    openSettings() {
        this.dialog.open(CalendarOptionsComponent, {
            ...defaultDialogConfig,
        });
    }

}
