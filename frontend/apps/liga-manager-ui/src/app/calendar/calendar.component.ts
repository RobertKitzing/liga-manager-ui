import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarQueryVariables } from '@liga-manager-api/graphql';
import {
    FullCalendarComponent,
    FullCalendarModule,
} from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService, I18nService } from '@liga-manager-ui/services';
import { Subject, switchMap, tap } from 'rxjs';

@Component({
    selector: 'lima-calendar',
    templateUrl: './calendar.component.html',
    styles: [],
    imports: [AsyncPipe, FullCalendarModule],
    standalone: true,
})
export class CalendarComponent implements OnInit, AfterViewInit {
    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

    eventTrigger = new Subject<CalendarQueryVariables>();

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        firstDay: 1,
        editable: false,
        datesSet: this.viewChanged.bind(this),
    };

    calendarApi!: Calendar;

    backgroundEvents = this.eventTrigger.pipe(
        switchMap((params) =>
            this.calendarService.getCalendarEvents(params).pipe(
                tap((events) => {
                    this.calendarOptions.events = events;
                }),
            ),
        ),
    );

    constructor(
        private i18nService: I18nService,
        private calendarService: CalendarService,
    ) {}

    ngOnInit() {
        this.calendarOptions.locale = this.i18nService.currentLang;
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
