import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject, map, Subject } from 'rxjs';
import {
    AllSeasonsFragment,
    AllSeasonsListGQL,
    Season,
    SeasonByIdGQL,
    SeasonByIdQueryVariables,
} from '@api/graphql';

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

    progressSeason$ = new BehaviorSubject<AllSeasonsFragment>(
        this.progressSeason,
    );

    historySeason$ = new BehaviorSubject<AllSeasonsFragment>(
        this.historySeason,
    );

    manageSeason$ = new Subject<AllSeasonsFragment>();

    seasonList$ = this.allSeasonlistGQL.watch().valueChanges.pipe(
        map((seasons) =>
            seasons.data.allSeasons?.sort((a, b) => {
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
    ) {
        this.progressSeason$.subscribe((season) => {
            if (season) {
                this.progressSeason = season;
            }
        });

        this.historySeason$.subscribe((season) => {
            if (season) {
                this.historySeason = season;
            }
        });
    }

    getSeason(params: SeasonByIdQueryVariables) {
        return this.seasonByIdGQL
            .watch(params)
            .valueChanges.pipe(map(({ data }) => data.season));
    }

    seasonCompare(c1: Season, c2: Season) {
        return c1 && c2 && c1.id === c2.id;
    }
}
