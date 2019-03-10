import { Injectable } from '@angular/core';
import { Client, CreateSeasonBody } from '../../api/liga-manager-api';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { Season, AllSeasonsList, AllSeasonsListGQL, RankingGQL, Ranking } from '../../api/graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  seasonsQGL = this.allSeasonsListGQL.watch();
  currentSeasonRankingQGL = this.rankingQGL.watch({ id: this._currentSeason.id });

  private get _currentSeason(): AllSeasonsList.AllSeasons {
    return JSON.parse(localStorage.getItem('SELECTED_SEASON')) || '';
  }

  private set _currentSeason(season: AllSeasonsList.AllSeasons) {
    if (season) {
      localStorage.setItem('SELECTED_SEASON', JSON.stringify(season));
    }
  }

  currentSeason: BehaviorSubject<AllSeasonsList.AllSeasons> = new BehaviorSubject<AllSeasonsList.AllSeasons>(this._currentSeason);
  seasonCreated: Subject<void> = new Subject<void>();

  constructor(
    private apiClient: Client,
    private allSeasonsListGQL: AllSeasonsListGQL,
    private rankingQGL: RankingGQL
  ) {
    this.currentSeason.subscribe(
      (season) => {
        if (season) {
          this._currentSeason = season;
          this.refetchCurrentSeason();
        }
      }
    );
  }

  getRankingForSeason(seasonId?: string): Observable<Ranking.Ranking | null> {
    const _seasonId = seasonId || this.currentSeason.getValue().id;
    if (!_seasonId) {
      return of(null);
    } else {
      return this.rankingQGL.watch(
        {
          id: _seasonId
        }
      ).valueChanges.pipe(
        map(
          ({ data }) => data.season.ranking
        )
      );
    }
  }

  refetchCurrentSeason() {
    // this.currentSeasonQGL.refetch({ id: this.currentSeason.getValue().id });
  }

  init() {

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

  seasonCompare(c1: Season.Fragment, c2: Season.Fragment) {
    return c1 && c2 && c1.id === c2.id;
  }
}
