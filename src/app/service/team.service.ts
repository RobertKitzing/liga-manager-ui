import { Team } from './../api/openapi';
import { Client } from '@app/api/openapi';
import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {

    private teams: Team[];
    public isLoadingTeams: boolean;

    constructor(private apiClient: Client) {
        this.loadTeams();
    }

    getTeamNameByID(id: string): string {
        const team: Team = this.teams.find(t => t.id === id);
        return team.name;
    }

    resetTeams() {
        this.teams = null;
    }

    getAllTeams(): Team[] {
        return this.teams;
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
