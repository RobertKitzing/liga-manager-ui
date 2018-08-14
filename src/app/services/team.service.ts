import { Injectable } from '@angular/core';
import { Team, Client, CreateTeamBody, Contact_person } from '../../api';

interface CacheTeamsInSeason {
  seasonId: string;
  teams: Team[];
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public get teams(): Team[] {
    return JSON.parse(localStorage.getItem('TEAMS')) || null;
  }
  public set teams(value: Team[]) {
    localStorage.setItem('TEAMS', JSON.stringify(value));
  }

  constructor(
    private apiClient: Client) {
  }

  getTeamContactByID(id: string) {
    const team: Team = this.teams.find(t => t.id === id);
    return team.contact || <Contact_person>{
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    };
  }

  getTeamById(id: string): Team {
    const team: Team = this.teams.find(t => t.id === id);
    return team;
  }

  async addNewTeam(teamName: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        if (!teamName) {
          resolve(false);
        }
        this.teams = null;
        const createTeamParams: CreateTeamBody = new CreateTeamBody();
        createTeamParams.name = teamName;
        this.apiClient.createTeam(createTeamParams).subscribe(
          async () => {
            this.teams = await this.loadTeams();
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        );
      }
    );
  }

  updateTeam(teamId?: string) {
    if (teamId) {
      this.apiClient.getTeam(teamId).subscribe(
        (team) => {
          let curteam = this.teams.find(t => t.id === teamId);
          curteam = team;
        }
      );
    } else {
      this.initLoadTeams();
    }
  }

  public async initLoadTeams() {
    this.teams = await this.loadTeams();
  }

  public async loadTeams(): Promise<Team[]> {
    return new Promise<Team[]>(
      (resolve) => {
        this.apiClient.getAllTeams().subscribe(
          (teams) => {
            resolve(teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
          },
          (error) => {
            resolve(this.teams);
          },
          () => {
          }
        );
      }
    );
  }

  public async loadTeamsInSeason(seasonId: string): Promise<Team[]> {
    return new Promise<Team[]>(
      (resolve) => {
        let cache: CacheTeamsInSeason[] = JSON.parse(localStorage.getItem('CACHE_TEAMS_IN_SEASON'));
        this.apiClient.getTeamsInSeason(seasonId).subscribe(
          (teams) => {
            if (!cache) {
              cache = new Array<CacheTeamsInSeason>();
            } else {
              cache = cache.filter(t => t.seasonId !== seasonId);
            }
            cache.push({
              seasonId: seasonId,
              teams: teams
            });
            localStorage.setItem('CACHE_TEAMS_IN_SEASON', JSON.stringify(cache));
            resolve(teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
          },
          (error) => {
            if (cache) {
              const teams = cache.find(t => t.seasonId === seasonId);
              if (teams) {
                resolve(teams.teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
              } else {
                resolve(null);
              }
            } else {
              resolve(null);
            }
          },
          () => {
          }
        );
      }
    );
  }
}
