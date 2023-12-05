import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
    AllTeamsGQL,
    CreateTeamGQL,
    DeleteTeamGQL,
    DeleteTeamMutationVariables,
    RenameTeamGQL,
    RenameTeamMutationVariables,
    Team,
    TeamByIdGQL,
    UpdateTeamContactGQL,
    UpdateTeamContactMutationVariables,
} from '@api/graphql';
import { v4 as uuidv4 } from 'uuid';
import { sortArrayBy } from '../utils';
import { HttpClient } from '@angular/common/http';
import { AppsettingsService } from './appsettings.service';

@Injectable({
    providedIn: 'root',
})
export class TeamService {

    allTeams$ = this.allTeamsGQL.watch().valueChanges.pipe(
        map(({ data }) => data.allTeams),
        map((teams) => sortArrayBy(teams as Team[], 'name')),
    );

    constructor(
        private teamByIdGQL: TeamByIdGQL,
        private allTeamsGQL: AllTeamsGQL,
        private createTeamQL: CreateTeamGQL,
        private deleteTeamGQL: DeleteTeamGQL,
        private renameTeamGQL: RenameTeamGQL,
        private updateTeamContactGQL: UpdateTeamContactGQL,
        private httpClient: HttpClient,
        private appsettingsService: AppsettingsService,
    ) {}

    getTeamById(id: string) {
        return this.teamByIdGQL.watch({ id }).valueChanges.pipe(
            map(({ data }) => data.team ),
        )
    }

    updateTeamContact(variables: UpdateTeamContactMutationVariables) {
        return this.updateTeamContactGQL.mutate(
            variables,
            {
                refetchQueries: [
                    {
                        query: this.allTeamsGQL.document,
                    },
                ],
            },
        );
    }

    createTeam(name: string) {
        return this.createTeamQL.mutate(
            {
                id: uuidv4(),
                name,
            },
            {
                refetchQueries: [
                    {
                        query: this.allTeamsGQL.document,
                    },
                ],
            },
        );
    }

    deleteTeam(variables: DeleteTeamMutationVariables) {
        return this.deleteTeamGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.allTeamsGQL.document,
                },
            ],
        });
    }

    renameTeam(variables: RenameTeamMutationVariables) {
        return this.renameTeamGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.allTeamsGQL.document,
                },
            ],
        });
    }

    uploadTeamLogo(teamId: string, file: File) {
        const fd = new FormData();
        fd.append('file', file)
        return this.httpClient.post(`${this.appsettingsService.appsettings?.host || ''}/api/logos`, fd);
    }

}
