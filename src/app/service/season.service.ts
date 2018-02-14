import { Subject } from 'rxjs/Subject';
import { Logger } from 'app/core/logger.service';
import { Season } from '@app/api/openopi';
import { SeasonState, Client } from './../api/openopi';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const log = new Logger('SeasonService');

@Injectable()
export class SeasonService {

    season = new Subject<Season>();
    seasons: Season[];
    selectedSeason: Season;

    constructor(private apiClient: Client) {
    }

    public init() {

        log.debug('SeasonService');

    }
    getSelectedSeason(): Season {
        return <Season>JSON.parse(localStorage.getItem('SELECTED_SEASON'));
    }

    async getSeasons(state: SeasonState | null | undefined): Promise<Season[]> {
        log.debug('getSteason');
        if (!this.seasons) {
            return new Promise<Season[]>(
                resolve => {
                    this.apiClient.seasonAll().subscribe(
                        (seasons: Season[]) => {
                            log.debug(seasons);
                            this.seasons = seasons;
                            const filterd: Season[] = this.seasons.filter(s => s.state === SeasonState.Progress);
                            log.debug(filterd);
                            resolve(state ? filterd : this.seasons);
                        },
                        (error: any) => {
                            log.debug(error);
                            resolve(null);
                        }
                    );
                }
            );
        } else {
            const filterd: Season[] = this.seasons.filter(s => s.state === SeasonState.Progress);
            log.debug(filterd);
            return state ? filterd : this.seasons;
        }
    }

    selectSeason(season: Season): void {
        this.season.next(season);
        this.selectedSeason = season;
        localStorage.setItem('SELECTED_SEASON', JSON.stringify(season));
    }
}
