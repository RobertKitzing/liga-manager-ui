import { Injectable } from '@angular/core';
import { TeamLogoService } from '@api/openapi';
import { map } from 'rxjs';
import {
    AllTeamsGQL,
    CreateTeamGQL,
    DeleteTeamGQL,
    DeleteTeamMutationVariables,
    RenameTeamGQL,
    RenameTeamMutationVariables,
    Team,
} from 'src/api/graphql';
import { v4 as uuidv4 } from 'uuid';
import { sortArrayBy } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class TeamService {

    allTeams$ = this.allTeamsGQL.watch().valueChanges.pipe(
        map(({ data }) => data.allTeams),
        map((teams) => sortArrayBy(teams as Team[], 'name')),
    );

    uploadTeamLogo = this.teamLogoService.uploadTeamLogo;

    commitPreview = this.teamLogoService.commitPreview;

    constructor(
        private allTeamsGQL: AllTeamsGQL,
        private createTeamQL: CreateTeamGQL,
        private deleteTeamGQL: DeleteTeamGQL,
        private renameTeamGQL: RenameTeamGQL,
        private teamLogoService: TeamLogoService,
    ) {}

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

}
