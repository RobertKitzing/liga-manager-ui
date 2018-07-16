import { Injectable } from '@angular/core';
import { Team, Client, CreateTeamBody } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  isLoadingTeams: boolean;
  public teams: Team[];

  constructor(private apiClient: Client) {
    this.loadTeams();
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
            resolve(true);
            await this.loadTeams();
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
              this.teams = teams;
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
