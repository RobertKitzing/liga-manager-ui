import { SELECTED_SEASON } from './../constanst';
import { Subject } from 'rxjs/Subject';
import { Logger } from 'app/core/logger.service';
import { Season } from '@app/api/openapi';
import { SeasonState, Client } from './../api/openapi';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const log = new Logger('SeasonService');

@Injectable()
export class SeasonService {

    season = new Subject<Season>();
    seasons: Season[];
    selectedSeason: Season;
    public isLoadingSeasons: boolean;

    constructor(private apiClient: Client) {
    }

    resetSeasons() {
        this.seasons = null;
    }

    getSelectedSeason(): Season {
        this.selectedSeason = <Season>JSON.parse(localStorage.getItem(SELECTED_SEASON));
        if (this.selectedSeason) {
            this.selectSeason(this.selectedSeason);
        }
        return this.selectedSeason;
    }

    async selectSeason(season: Season) {
        this.season.next(season);
        this.selectedSeason = season;
        localStorage.setItem(SELECTED_SEASON, JSON.stringify(season));
    }

    async getSeasons(state: SeasonState | null | undefined): Promise<Season[]> {
        this.isLoadingSeasons = true;
        if (!this.seasons) {
            return new Promise<Season[]>(
                resolve => {
                    this.apiClient.getAllSeasons().subscribe(
                        (seasons: Season[]) => {
                            this.seasons = seasons;
                            const filterd: Season[] = this.seasons.filter(s => s.state === SeasonState.Progress);
                            resolve(state ? filterd : this.seasons);
                        },
                        (error: any) => {
                            log.debug(error);
                            resolve(null);
                        },
                        () => {
                            this.isLoadingSeasons = false;
                        }
                    );
                }
            );
        } else {
            const filterd: Season[] = this.seasons.filter(s => s.state === SeasonState.Progress);
            this.isLoadingSeasons = false;
            return state ? filterd : this.seasons;
        }
    }
}
