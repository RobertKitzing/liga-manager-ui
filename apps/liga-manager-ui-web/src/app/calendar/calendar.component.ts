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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatchComponent, SeasonChooserComponent } from '@liga-manager-ui/components';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'lima-calendar',
    templateUrl: './calendar.component.html',
    styles: [],
    imports: [
        AsyncPipe,
        FullCalendarModule,
        MatToolbarModule,
        MatchComponent,
        SeasonChooserComponent,
        MatIcon,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    standalone: true,
})
export class CalendarComponent implements OnInit, AfterViewInit {

    from = input(new Date());

    to = input(new Date());

    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

    selectedSeasonFC = new FormControl();

    selectedView = new FormControl('list1Year', { nonNullable: true });

    eventTrigger = new Subject<CalendarQueryVariables>();

    calendarOptions: CalendarOptions = {
        headerToolbar: {
            start: '',
            center: 'title',
            end: '',
        },
        initialView: this.selectedView.value,
        plugins: [dayGridPlugin, listPlugin],
        views: {
            list1Week: {
                type: 'list',
                duration: { week: 1 },
            },
            list1Month: {
                type: 'list',
                duration: { month: 1 },
            },
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
        this.selectedView.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (view) => {
                console.log(view)
                this.calendarApi.changeView(view)
            },
        );
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

    prev() {
        this.calendarApi.prev();
    }

    next() {
        this.calendarApi.next();
    }

    today() {
        this.calendarApi.today();
    }

}
