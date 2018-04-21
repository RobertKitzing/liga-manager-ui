import { Team, CreateTeamBody, Contact_person } from './../api/openapi';
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

    getTeamByID(id: string): Team {
        const team: Team = this.teams.find(t => t.id === id);
        return team;
    }

    getTeamContactByID(id: string): Contact_person {
        const team: Team = this.teams.find(t => t.id === id);
        const emptyContact = new Contact_person();
        emptyContact.email = '';
        emptyContact.first_name = '';
        emptyContact.last_name = '';
        emptyContact.phone = '';
        return team.contact || emptyContact;
    }

    resetTeams() {
        this.teams = null;
    }

    getAllTeams(): Team[] {
        if (!this.teams) {
            this.loadTeams();
        }
        return this.teams;
    }

    async addNewTeam(teamName: string): Promise<boolean> {
        return new Promise<boolean>(
            (resolve) => {
                if (!teamName) {
                    resolve(false);
                }
                this.resetTeams();
                const createTeamParams: CreateTeamBody = new CreateTeamBody();
                createTeamParams.name = teamName;
                this.apiClient.createTeam(createTeamParams).subscribe(
                    () => {
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
