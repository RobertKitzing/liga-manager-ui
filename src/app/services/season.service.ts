import { Injectable } from '@angular/core';
import { Client, SeasonState, Season, Match_day } from '../../api/liga-manager-api';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  seasonInProgress: Season[];
  currentSeason: BehaviorSubject<Season> = new BehaviorSubject<Season>(JSON.parse(localStorage.getItem('SELECTED_SEASON')));
  seasonCreated: Subject<void> = new Subject<void>();

  constructor(private apiClient: Client) {
    this.currentSeason.subscribe(
      (season) => {
        localStorage.setItem('SELECTED_SEASON', JSON.stringify(season));
      }
    );
    this.seasonCreated.subscribe(
      () => {
        this.loadSeasonInProgress();
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
            resolve(seasons.filter(s => s.state === state));
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
