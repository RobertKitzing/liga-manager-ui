import { inject, Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import {
    AddPenaltyGQL,
    AddPenaltyMutationVariables,
    AddTeamToSeasonGQL,
    AddTeamToSeasonMutationVariables,
    AllSeasonsFragment,
    AllSeasonsListGQL,
    CreateMatchesForSeasonGQL,
    CreateMatchesForSeasonMutationVariables,
    CreateSeasonGQL,
    DeleteSeasonGQL,
    EndSeasonGQL,
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
    Season,
    SeasonByIdGQL,
    SeasonPenaltiesGQL,
    SeasonPenaltiesQueryVariables,
    StartSeasonGQL,
} from '@liga-manager-api/graphql';
import { StorageKeys } from '@liga-manager-ui/common';
import { fromStorage } from '../functions';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class SeasonService {

    private apollo = inject(Apollo);

    private seasonPenaltiesGQL = inject(SeasonPenaltiesGQL);

    private allSeasonlistGQL = inject(AllSeasonsListGQL);

    private seasonByIdGQL = inject(SeasonByIdGQL);

    private rankingGQL = inject(RankingByIdGQL);

    private createSeasonGQL = inject(CreateSeasonGQL);

    private addTeamToSeasonGQL = inject(AddTeamToSeasonGQL);

    private removeTeamFromSeasonGQL = inject(RemoveTeamFromSeasonGQL);

    private startSeasonGQL = inject(StartSeasonGQL);

    private deleteSeasonGQL = inject(DeleteSeasonGQL);

    private endSeasonGQL = inject(EndSeasonGQL);

    private createMatchesForSeasonGQL = inject(CreateMatchesForSeasonGQL);

    private replaceTeamInSeasonGQL = inject(ReplaceTeamInSeasonGQL);

    private rescheduleMatchDayGQL = inject(RescheduleMatchDayGQL);

    private scheduleAllMatchesForSeasonGQL = inject(ScheduleAllMatchesForSeasonGQL);

    private scheduleAllMatchesForMatchDayGQL = inject(ScheduleAllMatchesForMatchDayGQL);

    private addPenaltyGQL = inject(AddPenaltyGQL);

    private removePenaltyGQL = inject(RemovePenaltyGQL);

    progressSeason = fromStorage<AllSeasonsFragment>(StorageKeys.SELECTED_PROGRESS_SEASON);

    historySeason = fromStorage<AllSeasonsFragment>(StorageKeys.SELECTED_HISTORY_SEASON);

    manageSeason = fromStorage<Season>(StorageKeys.SELECTED_MANAGE_SEASON);

    seasonList$ = this.allSeasonlistGQL.watch().valueChanges.pipe(
        map((seasons) =>
            [...(seasons.data?.allSeasons || [])]?.sort((a, b) => {
                const aStartDate =
                    a?.match_days?.find((x) => x?.number === 1)?.start_date ||
                    '';
                const bStartDate =
                    b?.match_days?.find((x) => x?.number === 1)?.start_date ||
                    '';
                if (aStartDate < bStartDate) {
                    return 1;
                }
                if (aStartDate > bStartDate) {
                    return -1;
                }
                return 0;
            }),
        ),
    );

    reloadSeasons() {
        return this.allSeasonlistGQL.fetch(undefined, { fetchPolicy: 'network-only' }).pipe(take(1));
    }

    createSeason(name: string) {
        return this.createSeasonGQL.mutate(
            {
                name,
            },
            {
                refetchQueries: [
                    {
                        query: this.allSeasonlistGQL.document,
                    },
                ],
            },
        );
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

    seasonCompare(c1: Season, c2: Season) {
        return c1 && c2 && c1.id === c2.id;
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

    startSeason(seasonId: string) {
        return this.startSeasonGQL.mutate(
            {
                id: seasonId,
            },
            {
                refetchQueries: [
                    {
                        query: this.allSeasonlistGQL.document,
                    },
                ],
            },
        );
    }

    endSeason(season_id: string) {
        return this.endSeasonGQL.mutate(
            {
                season_id,
            },
            {
                refetchQueries: [
                    {
                        query: this.allSeasonlistGQL.document,
                    },
                ],
            },
        );
    }

    deleteSeason(season_id: string) {
        return this.deleteSeasonGQL.mutate(
            {
                season_id,
            },
            {
                refetchQueries: [
                    {
                        query: this.allSeasonlistGQL.document,
                    },
                ],
            },
        );
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
