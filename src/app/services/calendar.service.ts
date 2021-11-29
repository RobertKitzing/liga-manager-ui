import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarGQL, Match, MatchAppointment, MatchDay, Season, SeasonState } from 'src/api/graphql';
import { PublicHolidaysService } from './public-holidays.service';

export interface IMatchDayEvent {
  allDay: boolean;
  title: string;
  start: Date;
  end?: Date;
  matchDayIndex?: number;
  matchDayId?: string;
  display?: string;
  new?: boolean;
  match?: MatchAppointment;
  matchSeriesId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private holidaysService: PublicHolidaysService,
    private calendarGQL: CalendarGQL,
  ) { }

  getCalendarBackgroundEvents(): Observable<IMatchDayEvent[]> {
    return this.calendarGQL.watch().valueChanges.pipe(
      map(
        ({ data }) => {
          let events = new Array<IMatchDayEvent>();
          const seasons = [...data.allSeasons].filter(x => x.state !== SeasonState.Preparation)
          for (let season of seasons) {
            events = events.concat(
              season.match_days.map(
                (matchDay) => ({
                  allDay: true,
                  display: 'background',
                  title: `${matchDay.number}. Spieltag (${season.name})`,
                  start: dayjs(matchDay.start_date).toDate(),
                  end: dayjs(matchDay.end_date).toDate(),
                })
              ));
          }
          for (let tournament of data.allTournaments) {
            if (!tournament.rounds) {
              continue;
            }
            events =
              events.concat(
                tournament.rounds.map(
                  (round) => ({
                    allDay: true,
                    display: 'background',
                    title: `${round.number}. Runde (${tournament.name})`,
                    start: dayjs(round.start_date).toDate(),
                    end: dayjs(round.end_date).toDate(),
                  })
                ));
          }
          return events;
        }
      )
    );
  }

  getEvents(match_days: MatchDay[], holidays = true): Observable<IMatchDayEvent[]> {
    const matchDays = match_days?.map(
      (matchDay) => (
        {
          allDay: true,
          title: `${matchDay.number}. Spieltag`,
          matchDayIndex: matchDay.number - 1,
          matchDayId: matchDay.id,
          start: new Date(matchDay.start_date),
          end: new Date(matchDay.end_date),
        })
    );
    if (holidays) {
      return forkJoin([
        this.holidaysService.publicHolidays(dayjs().year()),
        this.holidaysService.publicHolidays(dayjs().year() + 1),
        of(matchDays || []),
      ]).pipe(
        map(([s1, s2, s3]) => [...s1, ...s2, ...s3]),
      );
    } else {
      return of(matchDays);
    }
  }
}
