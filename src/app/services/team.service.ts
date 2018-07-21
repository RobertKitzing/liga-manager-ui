import { Injectable } from '@angular/core';
import { Team, Client, CreateTeamBody } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  isLoadingTeams: boolean;
  public teams: Team[];

  constructor(private apiClient: Client) {
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
            await this.loadTeams();
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        );
      }
    );
  }
  async loadTeams(): Promise<Team[]> {
    this.isLoadingTeams = true;
    if (!this.teams) {
      return new Promise<Team[]>(
        (resolve) => {
          this.apiClient.getAllTeams().subscribe(
            (teams) => {
              this.teams = teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
              resolve(teams);
            },
            (error) => {
              resolve(null);
            },
            () => {
              this.isLoadingTeams = false;
            }
          );
        }
      );
    } else {
      this.isLoadingTeams = false;
      return this.teams;
    }
  }
}
