import { Injectable } from '@angular/core';
import { firstValueFrom, map, of } from 'rxjs';
import {
    AddTeamToSeasonGQL,
    AddTeamToSeasonMutationVariables,
    AllSeasonsFragment,
    AllSeasonsListGQL,
    CreateSeasonGQL,
    DeleteSeasonGQL,
    EndSeasonGQL,
    RankingByIdGQL,
    RemoveTeamFromSeasonGQL,
    RemoveTeamFromSeasonMutationVariables,
    Season,
    SeasonByIdGQL,
    StartSeasonGQL,
} from '@liga-manager-api/graphql';
import { LocalStorage } from 'ngx-webstorage';

const SELECTED_PROGRESS_SEASON_KEY = 'SELECTED_PROGRESS_SEASON';
const SELECTED_HISTORY_SEASON_KEY = 'SELECTED_HISTORY_SEASON';
const SELECTED_MANAGE_SEASON_KEY = 'SELECTED_MANAGE_SEASON';

@Injectable({
    providedIn: 'root',
})
export class SeasonService {

    @LocalStorage(SELECTED_PROGRESS_SEASON_KEY) progressSeason!: AllSeasonsFragment;

    @LocalStorage(SELECTED_HISTORY_SEASON_KEY) historySeason!: AllSeasonsFragment;

    @LocalStorage(SELECTED_MANAGE_SEASON_KEY) manageSeason: Season | undefined | null;

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

    constructor(
        private allSeasonlistGQL: AllSeasonsListGQL,
        private seasonByIdGQL: SeasonByIdGQL,
        private rankingGQL: RankingByIdGQL,
        private createSeasonGQL: CreateSeasonGQL,
        private addTeamToSeasonGQL: AddTeamToSeasonGQL,
        private removeTeamFromSeasonGQL: RemoveTeamFromSeasonGQL,
        private startSeasonGQL: StartSeasonGQL,
        private deleteSeasonGQL: DeleteSeasonGQL,
        private endSeasonGQL: EndSeasonGQL,
    ) {}

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
            return of(undefined)
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
        return firstValueFrom(
            this.startSeasonGQL.mutate(
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
            ),
        );
    }

    endSeason(season_id: string) {
        return firstValueFrom(
            this.endSeasonGQL.mutate(
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
            ),
        );
    }

    deleteSeason(season_id: string) {
        return firstValueFrom(
            this.deleteSeasonGQL.mutate(
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
            ),
        );
    }

}
