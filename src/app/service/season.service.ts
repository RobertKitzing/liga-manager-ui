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

    teams: Team[];
    public isLoadingTeams: boolean;

    constructor(private apiClient: Client) {
    }

    getTeamNameByID(id: string): string {
        const team: Team = this.teams.find(t => t.id === id);
        return team.name;
    }

    loadTeams(season: Season) {
        this.isLoadingTeams = true;
        this.apiClient.teamAll(season.id).subscribe(
          (teams: Team[]) => {
            log.debug(teams);
            this.teams = teams;
          },
          (error) => {
              log.error(error);
          },
          () => {
              this.isLoadingTeams = false;
          }
        );
    }

    selectSeason(season: Season): void {
        this.season.next(season);
        this.selectedSeason = season;
        this.loadTeams(season);
        localStorage.setItem(SELECTED_SEASON, JSON.stringify(season));
    }

    getSelectedSeason(): Season {
        this.selectedSeason = <Season>JSON.parse(localStorage.getItem(SELECTED_SEASON));
        if (this.selectedSeason) {
            this.loadTeams(this.selectedSeason);
        }
        return this.selectedSeason;
    }

    async getSeasons(state: SeasonState | null | undefined): Promise<Season[]> {
        this.isLoadingSeasons = true;
        if (!this.seasons) {
            log.debug('getSteasonFromServer');
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
