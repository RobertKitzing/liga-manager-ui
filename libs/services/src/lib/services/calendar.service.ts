import { inject, Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { forkJoin, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
    CalendarGQL,
    CalendarQueryVariables,
    MatchAppointment,
    MatchDay,
    Maybe,
    SeasonState,
    TournamentState,
} from '@liga-manager-api/graphql';
import { PublicHolidaysService } from './public-holidays.service';
import { TranslateService } from '@ngx-translate/core';

export interface IMatchDayEvent {
    allDay: boolean;
    title: string;
    start: string;
    end?: string;
    matchDay?: MatchDay;
    matchDayIndex?: number;
    matchDayId?: string;
    display?: string;
    new?: boolean;
    matchAppointment?: MatchAppointment;
    matchSeriesId?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    match?: any;
    team_ids?: string[];
}

import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Injectable({
    providedIn: 'root',
})
export class CalendarService {

    private translateService = inject(TranslateService);

    constructor(
        private holidaysService: PublicHolidaysService,
        private calendarGQL: CalendarGQL,
    ) {}

    reloadEvents() {
        return this.calendarGQL.fetch(undefined, { fetchPolicy: 'network-only' }).pipe(take(1));
    }

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
                            title: this.translateService.instant('MATCHDAY', { matchDay: matchDay?.number}),
                            start: dayjs(matchDay?.start_date).toJSON(),
                            end: dayjs(matchDay?.end_date).toJSON(),
                        })),
                    );
                }
                const tournaments = [...data.allTournaments!].filter(
                    (x) => x?.state !== TournamentState.Preparation,
                );
                for (const tournament of tournaments) {
                    if (!tournament?.rounds) {
                        continue;
                    }
                    events = events.concat(
                        tournament.rounds.map((round) => ({
                            allDay: true,
                            display: 'background',
                            title: this.translateService.instant('TOURNAMENT_ROUND', { round: round?.number }),
                            start: dayjs(round?.start_date, { utc: true }).toJSON(),
                            end: dayjs(round?.end_date).toJSON(),
                        })),
                    );
                }
                events = events.concat(
                    data.matchesByKickoff!.map((match) => ({
                        allDay: false,
                        title: `${match?.home_team.name} - ${match?.guest_team.name}`,
                        start: dayjs(match?.kickoff).toJSON(),
                        match,
                        team_ids: [ match?.home_team.id || '', match?.guest_team.id || '' ],
                    })),
                );
                return events;
            }),
        );
    }

    getEvents(match_days: Maybe<MatchDay>[], holidays?: boolean) {
        const matchDays: IMatchDayEvent[] = match_days?.map((matchDay) => ({
            allDay: true,
            title: this.translateService.instant('MATCHDAY', { matchDay: matchDay?.number}),
            matchDayIndex: (matchDay?.number || 1) - 1,
            matchDayId: matchDay?.id,
            start: dayjs.utc(matchDay?.start_date).toJSON(),
            end: dayjs.utc(matchDay?.end_date).toJSON(),
        })) || [];
        if (holidays) {
            return forkJoin([
                this.holidaysService.publicHolidays(dayjs().year() - 1),
                this.holidaysService.publicHolidays(dayjs().year()),
                this.holidaysService.publicHolidays(dayjs().year() + 1),
                this.holidaysService.publicSchoolOff(dayjs().year() - 1),
                this.holidaysService.publicSchoolOff(dayjs().year()),
                this.holidaysService.publicSchoolOff(dayjs().year() + 1),
                of(matchDays || []),
            ]).pipe(
                map((data) => data.flat()),
            )
        } else {
            return of(matchDays);
        }
    }

}
