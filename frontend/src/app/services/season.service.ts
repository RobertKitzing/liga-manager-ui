import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject, filter, map, Subject, tap } from 'rxjs';
import { AllSeasonsFragment, AllSeasonsListGQL, SeasonGQL, SeasonQueryVariables, SeasonState } from 'src/api/graphql';

const SELECTED_PROGRESS_SEASON_KEY = 'SELECTED_PROGRESS_SEASON';
const SELECTED_HISTORY_SEASON_KEY = 'SELECTED_HISTORY_SEASON';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  @LocalStorage(SELECTED_PROGRESS_SEASON_KEY) progressSeason!: AllSeasonsFragment;
  @LocalStorage(SELECTED_HISTORY_SEASON_KEY) historySeason!: AllSeasonsFragment;

  progressSeason$ = new BehaviorSubject<AllSeasonsFragment>(this.progressSeason);
  historySeason$ = new BehaviorSubject<AllSeasonsFragment>(this.historySeason);
  manageSeason$ = new Subject<AllSeasonsFragment>();

  constructor(
    private allSeasonlistGQL: AllSeasonsListGQL,
    private seasonGQL: SeasonGQL,
  ) {
  
    this.progressSeason$.subscribe(
      (season) => {
        if (season) {
          this.progressSeason = season;
        }
      }
    );

    this.historySeason$.subscribe(
      (season) => {
        if (season) {
          this.historySeason = season;
        }
      }
    );
  }
  
  seasonList$ = this.allSeasonlistGQL.watch().valueChanges.pipe(
      map(
        (seasons) => [...seasons.data.allSeasons!]?.sort((a, b) => a?.match_days?.find(x => x?.number === 1)?.start_date! < b?.match_days?.find(x => x?.number === 1)?.start_date! ? 1 : -1 )
      )
    )
  
  getSeason(params: SeasonQueryVariables) {
    return this.seasonGQL.watch(params).valueChanges.pipe(
      map(({ data }) => data.season)
    );
  }

  seasonCompare(c1: any, c2: any) {
    return c1 && c2 && c1.id === c2.id;
  }

}
