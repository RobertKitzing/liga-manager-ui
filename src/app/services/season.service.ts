import { Injectable } from '@angular/core';
import { Client, SeasonState, Season, CreateSeasonBody } from '../../api/liga-manager-api';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  seasonInProgress: Season[];
  private get _currentSeason(): Season {
    return JSON.parse(localStorage.getItem('SELECTED_SEASON')) || null;
  }

  private set _currentSeason(season: Season) {
    if (season) {
      localStorage.setItem('SELECTED_SEASON', JSON.stringify(season));
    }
  }

  currentSeason: BehaviorSubject<Season> = new BehaviorSubject<Season>(this._currentSeason);
  seasonCreated: Subject<void> = new Subject<void>();

  constructor(private apiClient: Client) {
    this.currentSeason.subscribe(
      (season) => {
        this._currentSeason = season;
      }
    );
    this.seasonCreated.subscribe(
      () => {
        this.loadSeasonInProgress();
      }
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

  public async loadSeasonInProgress() {
    this.seasonInProgress = await this.loadSeasons(SeasonState.Progress);
  }

  public async loadSeasons(state?: SeasonState | null): Promise<Season[]> {
    return new Promise<Season[]>(
      (resolve) => {
        this.apiClient.getAllSeasons().subscribe(
          (seasons: Season[]) => {
            resolve(state ? seasons.filter(s => s.state === state) : seasons);
          },
          (error: any) => {
            resolve(null);
          },
          () => {
          }
        );
      }
    );
  }

  seasonCompare(c1: Season, c2: Season) {
    return c1 && c2 && c1.id === c2.id;
  }
}
