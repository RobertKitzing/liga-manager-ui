import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { tap } from 'rxjs';
import { CalendarService } from 'src/app/services/calendar.service';
import { I18Service } from 'src/app/services/i18.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

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
  };

  backgroundEvents = this.calendarService.getCalendarBackgroundEvents().pipe(
    tap(
      (events) => {
        this.calendarOptions.events = events;
      }
    )
  );

  constructor(
    private i18Service: I18Service,
    private calendarService: CalendarService,
  ) {
  }

  async ngOnInit() {
    this.calendarOptions.locale = this.i18Service.currentLang;
  }

}
