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
        return <Season>JSON.parse(localStorage.getItem('SELECTED_SEASON')) || new Season();
    }

    async getSeasons(state: SeasonState | null | undefined): Promise<Season[]> {
        log.debug('getSteason');
        if (!this.seasons) {
            log.debug('Penis');
            return new Promise<Season[]>(
                resolve => {
                    this.apiClient.seasonAll().subscribe(
                        (seasons: Season[]) => {
                            log.debug(seasons);
                            this.seasons = seasons;
                            resolve(seasons);
                        },
                        (error: any) => {
                            log.debug(error);
                        }
                    );
                }
            );
            // const filterd: Season[] = this.seasons.filter(s => s.state === SeasonState.Progress);
            // log.debug(filterd);
            // return state ? filterd : this.seasons;
        } else {
            log.debug('Vagina');
            return this.seasons;
        }
    }

    selectSeason(seasonID: string): void {
        const s = this.seasons.find(x => x.id === seasonID);
        this.season.next(s);
        this.selectedSeason = s;
        localStorage.setItem('SELECTED_SEASON', JSON.stringify(s));
    }
}
