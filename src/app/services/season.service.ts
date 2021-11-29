import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { AddRankingPenaltyGQL, AddRankingPenaltyMutationVariables, AllSeasonsFragment, AllSeasonsListGQL, CreateMatchesForSeasonGQL, CreateMatchesForSeasonMutationVariables, CreateSeasonGQL, DeleteSeasonGQL, EndSeasonGQL, RankingGQL, RankingQueryVariables, RemoveRankingPenaltyGQL, RemoveRankingPenaltyMutationVariables, RescheduleMatchDayGQL, RescheduleMatchDayMutationVariables, SeasonFragment, SeasonGQL, SeasonPenaltiesGQL, SeasonPenaltiesQueryVariables, SeasonQueryVariables, StartSeasonGQL } from '../../api/graphql';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorage } from 'ngx-webstorage';

const SELECTED_SEASON_KEY = 'SELECTED_SEASON';
const MANAGE_SEASON_KEY = 'MANAGE_SEASON_KEY';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  @LocalStorage(SELECTED_SEASON_KEY) _currentSeason: AllSeasonsFragment;
  @LocalStorage(MANAGE_SEASON_KEY) _manageSeason: AllSeasonsFragment;

  currentSeason: BehaviorSubject<AllSeasonsFragment> = new BehaviorSubject<AllSeasonsFragment>(null);
  manageSeason: BehaviorSubject<AllSeasonsFragment> = new BehaviorSubject<AllSeasonsFragment>(null);

  seasonList: Observable<AllSeasonsFragment[]> = this.allSeasonsListGQL.watch().valueChanges.pipe(
    map(({ data }) => data.allSeasons),
    map((allSeasons) => {
      const t = [...allSeasons]
      return t.sort((a, b) => {
        const aState = a.state.toLocaleLowerCase();
        const bState = b.state.toLocaleLowerCase();
        if (aState > bState) {
          return -1;
        }
        if (aState < bState) {
          return 1;
        }
        const aName = a.name.toLocaleLowerCase();
        const bName = b.name.toLocaleLowerCase();
        if (aName > bName) {
          return 1;
        }
        if (aName < bName) {
          return -1;
        }
      });
    }),
  );

  constructor(
    private allSeasonsListGQL: AllSeasonsListGQL,
    private startSeasonGQL: StartSeasonGQL,
    private createSeasonGQL: CreateSeasonGQL,
    private seasonGQL: SeasonGQL,
    private endSeasonGQL: EndSeasonGQL,
    private rankingGQL: RankingGQL,
    private rescheduleMatchDayGQL: RescheduleMatchDayGQL,
    private createMatchesForSeasonGQL: CreateMatchesForSeasonGQL,
    private addPenaltyGQL: AddRankingPenaltyGQL,
    private seasonPenaltiesGQL: SeasonPenaltiesGQL,
    private removePenaltiesGQL: RemoveRankingPenaltyGQL,
    private deleteSeasonGQL: DeleteSeasonGQL,
  ) {
    this.currentSeason.subscribe(
      (season) => {
        if (season) {
          this._currentSeason = season;
        }
      }
    );
    if (this._currentSeason) {
      this.currentSeason.next(this._currentSeason);
    }
    this.manageSeason.subscribe(
      (season) => {
        if (season) {
          this._manageSeason = season;
        }
      }
    );
    if (this._manageSeason) {
      this.manageSeason.next(this._manageSeason);
    }
  }

  getSeason(params: SeasonQueryVariables) {
    return this.seasonGQL.watch(params).valueChanges.pipe(
      map(({ data }) => data.season)
    );
  }

  getRanking(params: RankingQueryVariables) {
    return this.rankingGQL.watch(params).valueChanges.pipe(
      map(({ data }) => data.season.ranking)
    );
  }

  getSeasonPenalties(params: SeasonPenaltiesQueryVariables) {
    return this.seasonPenaltiesGQL.watch(params).valueChanges.pipe(
      map(({ data }) => data.season)
    );
  }

  createSeason(seasonName: string) {
    return firstValueFrom(
      this.createSeasonGQL.mutate(
        {
          id: uuidv4(),
          name: seasonName
        },
        {
          refetchQueries: [
            { query: this.allSeasonsListGQL.document }
          ]
        }
      )
    );
  }

  startSeason(seasonId: string) {
    return firstValueFrom(
      this.startSeasonGQL.mutate(
        {
          id: seasonId
        },
        {
          refetchQueries: [
            {
              query: this.allSeasonsListGQL.document
            }
          ]
        }
      )
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
              query: this.allSeasonsListGQL.document
            }
          ]
        }
      )
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
              query: this.allSeasonsListGQL.document
            }
          ]
        }
      )
    );
  }

  rescheduleMatchDay(params: RescheduleMatchDayMutationVariables, season_id: string) {
    return firstValueFrom(
      this.rescheduleMatchDayGQL.mutate(
        params,
        {
          refetchQueries: [
            {
              query: this.seasonGQL.document,
              variables: { id: season_id }
            }
          ]
        }
      )
    );
  }

  createMatchesForSeason(params: CreateMatchesForSeasonMutationVariables) {
    return firstValueFrom(
      this.createMatchesForSeasonGQL.mutate(
        params,
        {
          refetchQueries: [
            {
              query: this.seasonGQL.document,
              variables: { id: params.season_id }
            }
          ]
        }
      )
    );
  }

  addPenalty(params: AddRankingPenaltyMutationVariables) {
    return firstValueFrom(
      this.addPenaltyGQL.mutate(
        params
        ,{
          refetchQueries: [
            {
              query: this.rankingGQL.document,
              variables: { id: params.season_id },
            },
            {
              query: this.seasonPenaltiesGQL.document,
              variables: { id: params.season_id },
            }
          ]
        })
    );
  }

  removePenalty(params: RemoveRankingPenaltyMutationVariables) {
    return firstValueFrom(
      this.removePenaltiesGQL.mutate(
        params
        ,{
          refetchQueries: [
            {
              query: this.rankingGQL.document,
              variables: { id: params.season_id },
            },
            {
              query: this.seasonPenaltiesGQL.document,
              variables: { id: params.season_id },
            }
          ]
        })
    );
  }

  seasonCompare(c1: any, c2: any) {
    return c1 && c2 && c1.id === c2.id;
  }
}
