import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AllSeasonsList, AllSeasonsListGQL, CreateSeasonGQL, StartSeasonGQL } from '../../api/graphql';
import * as uuid from 'uuid/v4';
import { LocalStorage } from 'ngx-webstorage';

const SELECTED_SEASON_KEY = 'SELECTED_SEASON';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  @LocalStorage(SELECTED_SEASON_KEY) _currentSeason: AllSeasonsList.AllSeasons;

  currentSeason: BehaviorSubject<AllSeasonsList.AllSeasons> = new BehaviorSubject<AllSeasonsList.AllSeasons>(this._currentSeason);

  constructor(
    private allSeasonsListGQL: AllSeasonsListGQL,
    private startSeasonGQL: StartSeasonGQL,
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

  async startSeason(seasonId: string): Promise<void> {
    return new Promise<void>(
      async (resolve, reject) => {
        try {
          await this.startSeasonGQL.mutate(
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
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    );
  }

  seasonCompare(c1: any, c2: any) {
    return c1 && c2 && c1.id === c2.id;
  }
}
