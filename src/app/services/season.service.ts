import { Injectable } from '@angular/core';
import { Client, SeasonState, Season } from 'src/api/liga-manager-api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  isLoadingSeasons: boolean;
  currentSeason: BehaviorSubject<Season> = new BehaviorSubject<Season>(JSON.parse(localStorage.getItem('SELECTED_SEASON')));

  constructor(private apiClient: Client) {
    this.currentSeason.subscribe(
      (season) => {
        localStorage.setItem('SELECTED_SEASON', JSON.stringify(season));
      }
    );
  }

  public async loadSeasons(state?: SeasonState | null): Promise<Season[]> {
    this.isLoadingSeasons = true;
    return new Promise<Season[]>(
      (resolve) => {
        this.apiClient.getAllSeasons().subscribe(
          (seasons: Season[]) => {
            if (!state) {
              resolve(seasons);
            } else {
              resolve(seasons.filter(s => s.state === SeasonState.Progress));
            }
          },
          (error: any) => {
            resolve(null);
          },
          () => {
            this.isLoadingSeasons = false;
          }
        );
      }
    );
  }

  seasonCompare(c1: Season, c2: Season) {
    return c1 && c2 && c1.name === c2.name;
  }
}
