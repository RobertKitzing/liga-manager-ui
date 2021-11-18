import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { forkJoin, Observable, of, scheduled } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchAppointment, MatchPlan } from 'src/api/graphql';
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
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private holidaysService: PublicHolidaysService,
  ) { }

  getEvents(season: MatchPlan.Season, holidays = true): Observable<IMatchDayEvent[]> {
    const matchDays = season?.match_days?.map(
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
