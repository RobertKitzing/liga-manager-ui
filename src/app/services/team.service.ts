import { Injectable } from '@angular/core';
import { Team, Client, CreateTeamBody, Contact_person } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public teams: Team[];

  constructor(private apiClient: Client) {
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
      this.load();
    }
  }

  public async load() {
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
            resolve(null);
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
        this.apiClient.getTeamsInSeason(seasonId).subscribe(
          (teams) => {
            resolve(teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
          },
          (error) => {
            resolve(null);
          },
          () => {
          }
        );
      }
    );
  }
}
