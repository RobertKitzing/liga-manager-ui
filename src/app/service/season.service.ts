import { Team } from './../api/openapi';
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

    private teams: Team[] = new Array<Team>();
    public isLoadingTeams: boolean;

    constructor(private apiClient: Client) {
    }

    public matchDayCount: number;

    getTeamNameByID(id: string): string {
        const team: Team = this.teams.find(t => t.id === id);
        return team.name;
    }

    async loadTeams(): Promise<Team[]> {
        this.isLoadingTeams = true;
        return new Promise<Team[]>(
            (resovle) => {
                this.apiClient.getTeamsInSeason(this.selectedSeason.id).subscribe(
                    (teams: Team[]) => {
                        resovle(teams);
                    },
                    (error) => {
                        log.error(error);
                    },
                    () => {
                        this.isLoadingTeams = false;
                    }
                );
            }
        );
    }

    async selectSeason(season: Season) {
        this.season.next(season);
        this.selectedSeason = season;
        this.teams = await this.loadTeams();
        localStorage.setItem(SELECTED_SEASON, JSON.stringify(season));
    }

    getSelectedSeason(): Season {
        this.selectedSeason = <Season>JSON.parse(localStorage.getItem(SELECTED_SEASON));
        if (this.selectedSeason) {
            this.selectSeason(this.selectedSeason);
        }
        return this.selectedSeason;
    }

    async getSeasons(state: SeasonState | null | undefined): Promise<Season[]> {
        this.isLoadingSeasons = true;
        if (!this.seasons) {
            log.debug('getSteasonFromServer');
            return new Promise<Season[]>(
                resolve => {
                    this.apiClient.getSeasonCollection().subscribe(
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
            log.debug('getSteasonFromCache');
            const filterd: Season[] = this.seasons.filter(s => s.state === SeasonState.Progress);
            log.debug(filterd);
            this.isLoadingSeasons = false;
            return state ? filterd : this.seasons;
        }
    }
}
