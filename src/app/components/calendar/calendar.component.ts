import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { Subject, switchMap, tap } from 'rxjs';
import { CalendarQueryVariables } from 'src/api/graphql';
import { CalendarService } from 'src/app/services/calendar.service';
import { I18Service } from 'src/app/services/i18.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  
  calendarOptions: CalendarOptions = {
    contentHeight: 'auto',
    aspectRatio: 3,
    expandRows: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    firstDay: 1,
    editable: false,
    events: [],
    selectMirror: true,
    datesSet: this.viewChanged.bind(this),
  };

  eventTrigger = new Subject<CalendarQueryVariables>();

  backgroundEvents = this.eventTrigger.pipe(
    switchMap(
      (params) => this.calendarService.getCalendarEvents(params).pipe(
        tap(
          (events) => {
            this.calendarOptions.events = events;
          }
        )
      ),
    ),
  );
  
  calendarApi: Calendar;

  constructor(
    private i18Service: I18Service,
    private calendarService: CalendarService,
  ) {
  }

  async ngOnInit() {
    this.calendarOptions.locale = this.i18Service.currentLang;
  }

  ngAfterViewInit(){
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
