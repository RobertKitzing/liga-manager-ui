import { Injectable } from '@angular/core';
import { Client, CreateSeasonBody } from '../../api/liga-manager-api';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';
import { Season, AllSeasonsList, AllSeasonsListGQL, SeasonGQL } from '../../api/graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  seasonsInProgress: Observable<AllSeasonsList.AllSeasons[]>;
  currentSeasonQGL = this.seasonQQL.watch({id: this._currentSeason.id});

  private get _currentSeason(): AllSeasonsList.AllSeasons {
    return JSON.parse(localStorage.getItem('SELECTED_SEASON')) || null;
  }

  private set _currentSeason(season: AllSeasonsList.AllSeasons) {
    if (season) {
      localStorage.setItem('SELECTED_SEASON', JSON.stringify(season));
    }
  }

  currentSeason: BehaviorSubject<AllSeasonsList.AllSeasons> = new BehaviorSubject<AllSeasonsList.AllSeasons>(this._currentSeason);
  seasonCreated: Subject<void> = new Subject<void>();

  allSeasonSubscrition: Subscription;

  constructor(
    private apiClient: Client,
    private allSeasonsListGQL: AllSeasonsListGQL,
    private seasonQQL: SeasonGQL
  ) {
    this.currentSeason.subscribe(
      async (season) => {
        this._currentSeason = season;
        await this.currentSeasonQGL.refetch({ id: season.id });
      }
    );
  }

  init() {
    this.seasonsInProgress =
      this.allSeasonsListGQL.watch().valueChanges.pipe(
        map(
          ({ data }) => data.allSeasons.filter(s => s.state === 'progress')
        )
      );
  }

  public async createSeason(seasonName: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        const createSeasonBody = new CreateSeasonBody();
        createSeasonBody.name = seasonName;
        this.apiClient.createSeason(createSeasonBody).subscribe(
          (t) => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  seasonCompare(c1: Season.Season, c2: Season.Season) {
    return c1 && c2 && c1.id === c2.id;
  }
}
