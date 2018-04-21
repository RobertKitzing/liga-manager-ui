import { SELECTED_SEASON } from './../constanst';
import { Subject } from 'rxjs/Subject';
import { Logger } from '@app/service/logger.service';
import { Season, CreateSeasonBody, Identifier } from '@app/api/openapi';
import { SeasonState, Client } from './../api/openapi';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

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

    seasonCompare(c1: Season, c2: Season) {
        return c1 && c2 && c1.name === c2.name;
    }

    async createSeason(name: string): Promise<Identifier | null> {

        return new Promise<Identifier>(
            (resolve) => {
                const opt: CreateSeasonBody = new CreateSeasonBody();
                opt.name = name;
                this.apiClient.createSeason(opt).subscribe(
                  (id: Identifier) => {
                    this.resetSeasons();
                    resolve(id);
                  }
                //   ,
                //   (error) => {
                //     log.error(error);
                //     resolve(null);
                //   }
                );
            }
        );
    }
}
