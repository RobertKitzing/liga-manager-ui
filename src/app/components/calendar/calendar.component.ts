import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllSeasonsCalendarGQL, SeasonState } from 'src/api/graphql';
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

  constructor(
    private i18Service: I18Service,
    private allSeasonsCalendarGQL: AllSeasonsCalendarGQL,
  ) {
  }

  async ngOnInit() {
    this.calendarOptions.locale = this.i18Service.currentLang;
    const allSeasonsCalendar = await this.allSeasonsCalendarGQL.fetch().pipe(
      map(
        (allSeasons) => {
          const seasons = allSeasons.data.allSeasons.filter(x => x.state === SeasonState.Progress);
          let calendarEvents = [];
          for (let season of seasons) {
            calendarEvents = calendarEvents.concat(
              season.match_days.map(
              (matchDay) => (
                {
                  allDay: true,
                  title: `${matchDay.number}. Spieltag (${season.name})`,
                  start: new Date(matchDay.start_date),
                  end: new Date(matchDay.end_date),
                  display: 'background',
                })
            ));
            for (let matchDay of season.match_days) {
              calendarEvents = calendarEvents.concat(
                matchDay.matches.map(
                  (match) => ({
                    title: `${match.home_team.name} - ${match.guest_team.name}`,
                    start: new Date(match.kickoff),
                  })
                )
              );
            }
          }
          return calendarEvents;
        }
      )
    ).toPromise();
    console.log(allSeasonsCalendar);
    this.calendarOptions.events = allSeasonsCalendar;
  }

}
