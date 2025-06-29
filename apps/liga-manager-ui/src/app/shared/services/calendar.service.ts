import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    CalendarGQL,
    CalendarQueryVariables,
    MatchAppointment,
    MatchDay,
    SeasonState,
} from '@liga-manager-api/graphql';
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
    providedIn: 'root',
})
export class CalendarService {
    constructor(
        private holidaysService: PublicHolidaysService,
        private calendarGQL: CalendarGQL,
    ) {}

    getCalendarEvents(
        params: CalendarQueryVariables,
    ): Observable<IMatchDayEvent[]> {
        return this.calendarGQL.watch(params).valueChanges.pipe(
            map(({ data }) => {
                let events = new Array<IMatchDayEvent>();
                const seasons = [...data.allSeasons!].filter(
                    (x) => x?.state !== SeasonState.Preparation,
                );
                for (const season of seasons) {
                    events = events.concat(
                        season!.match_days!.map((matchDay) => ({
                            allDay: true,
                            display: 'background',
                            title: `${matchDay?.number}. Spieltag (${season?.name})`,
                            start: dayjs(matchDay?.start_date).toDate(),
                            end: dayjs(matchDay?.end_date).toDate(),
                        })),
                    );
                }
                for (const tournament of data.allTournaments!) {
                    if (!tournament?.rounds) {
                        continue;
                    }
                    events = events.concat(
                        tournament.rounds.map((round) => ({
                            allDay: true,
                            display: 'background',
                            title: `${round?.number}. Runde (${tournament?.name})`,
                            start: dayjs(round?.start_date).toDate(),
                            end: dayjs(round?.end_date).toDate(),
                        })),
                    );
                }
                events = events.concat(
                    data.matchesByKickoff!.map((match) => ({
                        allDay: false,
                        title: `${match?.home_team.name} - ${match?.guest_team.name}`,
                        start: match?.kickoff,
                    })),
                );
                return events;
            }),
        );
    }

    getEvents(match_days: MatchDay[]): Observable<IMatchDayEvent[]> {
        const matchDays = match_days?.map((matchDay) => ({
            allDay: true,
            title: `${matchDay.number}. Spieltag`,
            matchDayIndex: matchDay.number - 1,
            matchDayId: matchDay.id,
            start: new Date(matchDay.start_date),
            end: new Date(matchDay.end_date),
        }));
        // if (holidays) {
        //   return forkJoin(
        //     this.holidaysService.publicHolidays(dayjs().year()),
        //     this.holidaysService.publicHolidays(dayjs().year() + 1),
        //     of(matchDays || []),
        //   );
        // } else {
        return of(matchDays);
        // }
    }
}
