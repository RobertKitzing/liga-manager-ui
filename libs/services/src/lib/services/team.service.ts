import { inject, Injectable } from '@angular/core';
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
import { Store } from '@ngxs/store';
import { LogosService } from '@liga-manager-api/openapi';
import { AppSettingsSelectors, AuthStateSelectors } from '@liga-manager-ui/states';

@Injectable({
    providedIn: 'root',
})
export class TeamService {

    private logoService = inject(LogosService);

    private teamByIdGQL = inject(TeamByIdGQL);

    private allTeamsGQL = inject(AllTeamsGQL);

    private createTeamQL = inject(CreateTeamGQL);

    private deleteTeamGQL = inject(DeleteTeamGQL);

    private renameTeamGQL = inject(RenameTeamGQL);

    private updateTeamContactGQL = inject(UpdateTeamContactGQL);

    private store = inject(Store);

    allTeams$ = this.allTeamsGQL.watch().valueChanges.pipe(
        map(({ data }) => data.allTeams),
        map((teams) => sortArrayBy(teams as Team[], 'name')),
    );

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

    async uploadTeamLogo(teamId: string, base64Url: string) {

        const blob = await (await fetch(base64Url)).blob();
        const formData = new FormData();
        formData.append('file', blob);
        return fetch(
            `${this.store.selectSnapshot(AppSettingsSelectors.host)}/api/logos?teamId=${teamId}`, {
                method: 'post',
                body: formData,
                headers: {
                    'authorization': this.store.selectSnapshot(AuthStateSelectors.properties.token) || '',
                },
            },
        );
    }

    deleteTeamLogo(teamId: string) {
        return this.logoService.deleteLogo(teamId);
    }

    teamCompare(c1: Team, c2: Team) {
        return c1 && c2 && c1.id === c2.id;
    }

}
