import { inject, Injectable } from '@angular/core';
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
import { add, getYear, parseISO } from 'date-fns';

export interface IMatchDayEvent {
    allDay: boolean;
    title: string;
    start: Date | undefined;
    end?: Date;
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

@Injectable({
    providedIn: 'root',
})
export class CalendarService {

    private translateService = inject(TranslateService);

    private holidaysService = inject(PublicHolidaysService);

    private calendarGQL = inject(CalendarGQL);

    reloadEvents() {
        return this.calendarGQL.fetch(undefined, { fetchPolicy: 'network-only' }).pipe(take(1));
    }

    getCalendarEvents(
        params: CalendarQueryVariables,
    ): Observable<IMatchDayEvent[]> {
        return this.calendarGQL.watch(params, { fetchPolicy: 'network-only' } ).valueChanges.pipe(
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
                            start: parseISO(matchDay?.start_date || ''),
                            end: parseISO(matchDay?.end_date ||''),
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
                            start: parseISO(round?.start_date || ''),
                            end: parseISO(round?.end_date || ''),
                        })),
                    );
                }
                events = events.concat(
                    data.matchesByKickoff!.map((match) => ({
                        allDay: false,
                        title: `${match?.home_team.name} - ${match?.guest_team.name}`,
                        start: parseISO(match?.kickoff || ''),
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
            start: parseISO(matchDay?.start_date || ''),
            end: add(parseISO(matchDay?.end_date || ''), { days: 1 }),
        })) || [];
        if (holidays) {
            return forkJoin([
                this.holidaysService.publicHolidays(getYear(new Date()) - 1),
                this.holidaysService.publicHolidays(getYear(new Date())),
                this.holidaysService.publicHolidays(getYear(new Date()) + 1),
                this.holidaysService.publicSchoolOff(getYear(new Date()) - 1),
                this.holidaysService.publicSchoolOff(getYear(new Date())),
                this.holidaysService.publicSchoolOff(getYear(new Date()) + 1),
                of(matchDays || []),
            ]).pipe(
                map((data) => data.flat()),
            );
        } else {
            return of(matchDays);
        }
    }

}
