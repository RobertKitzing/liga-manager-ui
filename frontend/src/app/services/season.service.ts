import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject, filter, map, Subject, tap } from 'rxjs';
import { AllSeasonsFragment, AllSeasonsListGQL, SeasonGQL, SeasonQueryVariables, SeasonState } from 'src/api/graphql';

const SELECTED_SEASON_KEY = 'SELECTED_SEASON';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  @LocalStorage(SELECTED_SEASON_KEY) _currentSeason!: AllSeasonsFragment;

  currentSeason$ = new BehaviorSubject<AllSeasonsFragment>(this._currentSeason);
  manageSeason$ = new Subject<AllSeasonsFragment>();

  constructor(
    private allSeasonlistGQL: AllSeasonsListGQL,
    private seasonGQL: SeasonGQL,
  ) {
    this.currentSeason$.subscribe(
      (season) => {
        if (season) {
          this._currentSeason = season;
        }
      }
    );
  }
  
  seasonList$(states: SeasonState[]) {
    return this.allSeasonlistGQL.watch().valueChanges.pipe(
      map(
        (seasons) => seasons.data.allSeasons?.filter(s => states.some( x => x === s?.state))
      ),
    )
  }
  
  getSeason(params: SeasonQueryVariables) {
    return this.seasonGQL.watch(params).valueChanges.pipe(
      map(({ data }) => data.season)
    );
  }

  seasonCompare(c1: any, c2: any) {
    return c1 && c2 && c1.id === c2.id;
  }

}
