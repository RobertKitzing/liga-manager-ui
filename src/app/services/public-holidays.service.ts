import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMatchDayEvent } from './calendar.service';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidaysService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  publicHolidays(year: number, county = 'HB'): Observable<IMatchDayEvent[]> {
    return this.httpClient.get(
      `https://feiertage-api.de/api/?jahr=${year}&nur_land=${county}`
      ).pipe(
        map(
          (result) => {
            const holidays = new Array<IMatchDayEvent>();
            for (const holiday of Object.keys(result)) {
              holidays.push({
                allDay: true,
                title: holiday,
                matchDayIndex: -1,
                matchDayId: '',
                start: result[holiday].datum,
                end: result[holiday].datum,
                display: 'background',
              });
            }
            return holidays;
          }
        )
      );
  }
}
