import { inject, Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import {
    AddPenaltyGQL,
    AddPenaltyMutationVariables,
    AddTeamToSeasonGQL,
    AddTeamToSeasonMutationVariables,
    CreateMatchesForSeasonGQL,
    CreateMatchesForSeasonMutationVariables,
    RankingByIdGQL,
    RemovePenaltyGQL,
    RemovePenaltyMutationVariables,
    RemoveTeamFromSeasonGQL,
    RemoveTeamFromSeasonMutationVariables,
    ReplaceTeamInSeasonGQL,
    ReplaceTeamInSeasonMutationVariables,
    RescheduleMatchDayGQL,
    RescheduleMatchDayMutationVariables,
    ScheduleAllMatchesForMatchDayGQL,
    ScheduleAllMatchesForMatchDayMutationVariables,
    ScheduleAllMatchesForSeasonGQL,
    ScheduleAllMatchesForSeasonMutationVariables,
    SeasonByIdGQL,
    SeasonListGQL,
    SeasonPenaltiesGQL,
    SeasonPenaltiesQueryVariables,
} from '@liga-manager-api/graphql';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class SeasonService {

    private seasonListGQL = inject(SeasonListGQL);

    private apollo = inject(Apollo);

    private seasonPenaltiesGQL = inject(SeasonPenaltiesGQL);

    private seasonByIdGQL = inject(SeasonByIdGQL);

    private rankingGQL = inject(RankingByIdGQL);

    private addTeamToSeasonGQL = inject(AddTeamToSeasonGQL);

    private removeTeamFromSeasonGQL = inject(RemoveTeamFromSeasonGQL);

    private createMatchesForSeasonGQL = inject(CreateMatchesForSeasonGQL);

    private replaceTeamInSeasonGQL = inject(ReplaceTeamInSeasonGQL);

    private rescheduleMatchDayGQL = inject(RescheduleMatchDayGQL);

    private scheduleAllMatchesForSeasonGQL = inject(ScheduleAllMatchesForSeasonGQL);

    private scheduleAllMatchesForMatchDayGQL = inject(ScheduleAllMatchesForMatchDayGQL);

    private addPenaltyGQL = inject(AddPenaltyGQL);

    private removePenaltyGQL = inject(RemovePenaltyGQL);

    reloadSeasons() {
        return this.seasonListGQL.fetch(undefined, { fetchPolicy: 'network-only' }).pipe(take(1));
    }

    getSeasonById$(id: string | undefined) {
        if (!id) {
            return of(undefined);
        }
        return this.seasonByIdGQL
            .watch({ id })
            .valueChanges.pipe(map(({ data }) => data.season));
    }

    getRankingById$(id: string) {
        return this.rankingGQL
            .watch({ id })
            .valueChanges.pipe(map(({ data }) => data?.season?.ranking));
    }

    refetchRankingById(id: string) {
        this.rankingGQL.watch({ id }).refetch();
    }

    refetchSeasonById(id: string) {
        this.seasonByIdGQL.watch({ id }).refetch();
    }

    addTeamToSeason(variables: AddTeamToSeasonMutationVariables) {
        return this.addTeamToSeasonGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.seasonByIdGQL.document,
                    variables: { id: variables.season_id },
                },
            ],
        });
    }

    removeTeamFromSeason(variables: RemoveTeamFromSeasonMutationVariables) {
        return this.removeTeamFromSeasonGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.seasonByIdGQL.document,
                    variables: { id: variables.season_id },
                },
            ],
        });
    }

    createMatchesForSeason(params: CreateMatchesForSeasonMutationVariables) {
        return this.createMatchesForSeasonGQL.mutate(
            params,
            {
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: params.season_id },
                    },
                ],
            },
        );
    }

    replaceTeamInSeason(params: ReplaceTeamInSeasonMutationVariables) {
        return this.replaceTeamInSeasonGQL.mutate(
            params,
            {
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: params.season_id },
                    },
                ],
            },
        );
    }

    rescheduleMatchDay(params: RescheduleMatchDayMutationVariables, season_id: string) {
        return this.rescheduleMatchDayGQL.mutate(
            params,
            {
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: season_id },
                    },
                ],
            },
        );
    }

    rescheduleMatchDays(params: RescheduleMatchDayMutationVariables[], season_id: string) {
        let mutation = 'mutation RescheduleMatchDays {\n';
        for (const i in params) {
            const param = params[i];
            mutation += `rescheduleMatchDay${i}: rescheduleMatchDay(match_day_id: "${param.match_day_id}", date_period: { from: "${param.date_period.from.toJSON()}", to: "${param.date_period.to.toJSON()}" }) \n`;
        }
        mutation += '}';
        return this.apollo.mutate(
            {
                mutation: gql(mutation),
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: season_id },
                    },
                ],
            },
        );
    }

    scheduleAllMatchesForMatchDay(params: ScheduleAllMatchesForMatchDayMutationVariables, seasonId?: string) {
        return this.scheduleAllMatchesForMatchDayGQL.mutate(
            params,
            {
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: seasonId },
                    },
                ],
            },
        );
    }

    scheduleAllMatchesForSeason(params: ScheduleAllMatchesForSeasonMutationVariables) {
        return this.scheduleAllMatchesForSeasonGQL.mutate(
            params,
            {
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: params.season_id },
                    },
                ],
            },
        );
    }

    getSeasonPenalties(params: SeasonPenaltiesQueryVariables) {
        return this.seasonPenaltiesGQL.watch(params).valueChanges.pipe(
            map(({ data }) => data.season?.ranking?.penalties),
        );
    }

    addPenalty(params: AddPenaltyMutationVariables) {
        return this.addPenaltyGQL.mutate(
            params,
            {
                refetchQueries: [
                    {
                        query: this.rankingGQL.document,
                        variables: { id: params.season_id },
                    },
                    {
                        query: this.seasonPenaltiesGQL.document,
                        variables: { id: params.season_id },
                    },
                ],
            },
        );
    }

    removePenalty(params: RemovePenaltyMutationVariables) {
        return this.removePenaltyGQL.mutate(
            params,
            {
                refetchQueries: [
                    {
                        query: this.rankingGQL.document,
                        variables: { id: params.season_id },
                    },
                    {
                        query: this.seasonPenaltiesGQL.document,
                        variables: { id: params.season_id },
                    },
                ],
            });
    }

}
