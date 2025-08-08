import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject, input, OnInit, ViewChild } from '@angular/core';
import { CalendarQueryVariables } from '@liga-manager-api/graphql';
import {
    FullCalendarComponent,
    FullCalendarModule,
} from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { CalendarService, I18nService } from '@liga-manager-ui/services';
import { Subject, switchMap, tap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatchComponent } from '@liga-manager-ui/components';

@Component({
    selector: 'lima-calendar',
    templateUrl: './calendar.component.html',
    styles: [],
    imports: [
        AsyncPipe, FullCalendarModule, MatToolbarModule, MatchComponent,
    ],
    standalone: true,
})
export class CalendarComponent implements OnInit, AfterViewInit {

    from = input(new Date());

    to = input(new Date());

    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

    selectedSeasonFC = new FormControl();

    eventTrigger = new Subject<CalendarQueryVariables>();

    calendarOptions: CalendarOptions = {
        headerToolbar: {
            start: 'title',
            center: 'dayGridMonth,dayGridWeek list1Year',
            end: 'today prev,next',
        },
        initialView: 'list1Year',
        plugins: [dayGridPlugin, listPlugin],
        views: {
            list1Year: {
                type: 'list',
                duration: { year: 1 },
            },
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
                    console.log(events);
                    this.calendarOptions.events = events;
                }),
            ),
        ),
    );

    private destroyRef = inject(DestroyRef);

    constructor(
        private i18nService: I18nService,
        private calendarService: CalendarService,
        private translateService: TranslateService,
    ) {}

    ngOnInit() {
        this.calendarService.reloadEvents();
        this.calendarOptions.locale = this.i18nService.currentLang;
        this.translateService.onLangChange.subscribe((lang) => this.calendarOptions.locale = lang.lang);
    }

    ngAfterViewInit() {
        this.calendarApi = this.calendarComponent.getApi();
        this.eventTrigger.next({
            min_date: this.calendarApi.view.activeStart,
            max_date: this.calendarApi.view.activeEnd,
        });
    }

    viewChanged() {
        this.calendarApi = this.calendarComponent.getApi();
        this.eventTrigger.next({
            min_date: this.calendarApi.view.activeStart,
            max_date: this.calendarApi.view.activeEnd,
        });
    }

}
