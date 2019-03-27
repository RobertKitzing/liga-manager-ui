import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AllSeasonsList, AllSeasonsListGQL, CreateSeasonGQL } from '../../api/graphql';
import * as uuid from 'uuid/v4';
import { LocalStorage } from 'ngx-store';

const SELECTED_SEASON_KEY = 'SELECTED_SEASON';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  @LocalStorage(SELECTED_SEASON_KEY) _currentSeason: AllSeasonsList.AllSeasons;

  currentSeason: BehaviorSubject<AllSeasonsList.AllSeasons> = new BehaviorSubject<AllSeasonsList.AllSeasons>(this._currentSeason);

  constructor(
    private allSeasonsListGQL: AllSeasonsListGQL,
    private createSeasonGQL: CreateSeasonGQL
  ) {
    this.currentSeason.subscribe(
      (season) => {
        if (season) {
          this._currentSeason = season;
        }
      }
    );
  }

  public async createSeason(seasonName: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.createSeasonGQL.mutate(
          {
            id: uuid(),
            name: seasonName
          },
          {
            refetchQueries: [
              { query: this.allSeasonsListGQL.document }
            ]
          }
        ).subscribe(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  seasonCompare(c1: any, c2: any) {
    return c1 && c2 && c1.id === c2.id;
  }
}
