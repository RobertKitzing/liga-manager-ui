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
} from '@liga-manager-api/graphql';
import { v4 as uuidv4 } from 'uuid';
import { sortArrayBy } from '@liga-manager-ui/utils';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppsettingsService } from './appsettings.service';
import { AuthenticationService } from './authentication.service';

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
        private authenticationService: AuthenticationService,
    ) {}

    refetchAllTeams() {
        this.allTeamsGQL.watch().refetch();
    }

    refetchTeamById(id: string) {
        this.teamByIdGQL.watch({ id }).refetch();
    }

    getTeamById(id: string) {
        return this.teamByIdGQL
            .watch({ id })
            .valueChanges.pipe(map(({ data }) => data.team));
    }

    updateTeamContact(variables: UpdateTeamContactMutationVariables) {
        return this.updateTeamContactGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.allTeamsGQL.document,
                },
            ],
        });
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
        fd.append('file', file);
        const params = new HttpParams().set('teamId', teamId);
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.authenticationService.accessToken()}`,
        );
        return this.httpClient.post(
            `${this.appsettingsService.appsettings?.host || ''}/api/logos`,
            fd,
            { params, headers },
        );
    }

    deleteTeamLogo(teamId: string) {
        const params = new HttpParams().set('teamId', teamId);
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.authenticationService.accessToken()}`,
        );
        return this.httpClient.delete(
            `${this.appsettingsService.appsettings?.host || ''}/api/logos`,
            { params, headers },
        );
    }

    teamCompare(c1: Team, c2: Team) {
        return c1 && c2 && c1.id === c2.id;
    }

}
