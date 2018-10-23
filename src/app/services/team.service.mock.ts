import { Injectable } from '@angular/core';
import { ITeamService } from './team.service';
import { Team, Contact_person } from '../../api';

@Injectable()
export class TeamServiceMock implements ITeamService {

    getTeamContactByID(id: string): Contact_person {
        throw new Error('Method not implemented.');
    }

    getTeamById(id: string): Team {
        throw new Error('Method not implemented.');
    }

    addNewTeam(teamName: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => { resolve(true); });
    }

    updateTeam(teamId: string) {
        throw new Error('Method not implemented.');
    }

    initLoadTeams() {
        throw new Error('Method not implemented.');
    }

    loadAllTeams(): Promise<Team[]> {
        throw new Error('Method not implemented.');
    }

    loadTeamsInSeason(seasonId: string): Promise<Team[]> {
        throw new Error('Method not implemented.');
    }

}
