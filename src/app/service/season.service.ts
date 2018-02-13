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

    constructor(private apiClient: Client) {
    }

    private loadSeasons() {

        log.debug('SeasonService');
        this.apiClient.seasonAll().subscribe(
            (seasons: Season[]) => {
                log.debug(seasons);
                this.seasons = seasons;
            },
            (error: any) => {
                log.debug(error);
            }
        );
    }

    getSeasons(state: SeasonState | null | undefined): Season[] {
        if (!this.seasons) {
            this.loadSeasons();
        }
        const filterd: Season[] = this.seasons.filter(s => s.state === SeasonState.Progress);
        log.debug(filterd);
        return state ? filterd : this.seasons;
    }

    selectSeason(seasonID: string): void {
        this.season.next(this.seasons.find(x => x.id === seasonID));
    }
}
