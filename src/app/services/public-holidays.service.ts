import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidaysService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  publicHolidays(year: number, county = 'HB'): Observable<any> {
    return this.httpClient.get(
      `https://feiertage-api.de/api/?jahr=${year}&nur_land=${county}`
      ).pipe(
        map(
          (result) => {
            const holidays = [];
            for (const holiday of Object.keys(result)) {
              holidays.push({
                allday: true,
                title: holiday,
                start: result[holiday].datum,
                end: result[holiday].datum,
              });
            }
            return holidays;
          }
        )
      );
  }
}
