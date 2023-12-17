import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
    AllSeasonsFragment,
    AllSeasonsListGQL,
    CreateSeasonGQL,
    RankingByIdGQL,
    Season,
    SeasonByIdGQL,
} from '@api/graphql';
import { LocalStorage } from 'ngx-webstorage';

const SELECTED_PROGRESS_SEASON_KEY = 'SELECTED_PROGRESS_SEASON';
const SELECTED_HISTORY_SEASON_KEY = 'SELECTED_HISTORY_SEASON';

@Injectable({
    providedIn: 'root',
})
export class SeasonService {

    @LocalStorage(SELECTED_PROGRESS_SEASON_KEY)
    progressSeason!: AllSeasonsFragment;

    @LocalStorage(SELECTED_HISTORY_SEASON_KEY)
    historySeason!: AllSeasonsFragment;

    seasonList$ = this.allSeasonlistGQL.watch().valueChanges.pipe(
        map((seasons) =>
            [...seasons.data.allSeasons || []]?.sort((a, b) => {
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
    ) {
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
        )
    }

    getSeasonById$(id: string) {
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

}
