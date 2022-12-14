import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Subject, tap } from 'rxjs';
import { AllSeasonsFragment, AllSeasonsListGQL, SeasonState } from 'src/api/graphql';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  currentSeason$ = new Subject<AllSeasonsFragment>();

  constructor(
    private allSeasonlistGQL: AllSeasonsListGQL,
  ) { }
  
  seasonsInProgress$ = this.allSeasonlistGQL.watch().valueChanges.pipe(
    map(
      (seasons) => seasons.data.allSeasons?.filter(s => s?.state === SeasonState.Progress)
    ),
    tap(
      (season) => this.currentSeason$.next(season![0]!)
    )
  )

}
