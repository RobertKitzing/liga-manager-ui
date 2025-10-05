import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
    Team,
    TeamByIdGQL,
    TeamListGQL,
    UpdateTeamContactGQL,
    UpdateTeamContactMutationVariables,
} from '@liga-manager-api/graphql';
import { Store } from '@ngxs/store';
import { LogosService } from '@liga-manager-api/openapi';
import { AppSettingsSelectors, AuthStateSelectors } from '@liga-manager-ui/states';

@Injectable({
    providedIn: 'root',
})
export class TeamService {

    private teamListGQL = inject(TeamListGQL);

    private logoService = inject(LogosService);

    private teamByIdGQL = inject(TeamByIdGQL);

    private updateTeamContactGQL = inject(UpdateTeamContactGQL);

    private store = inject(Store);

    refetchAllTeams() {
        this.teamListGQL.watch().refetch();
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
                    query: this.teamListGQL.document,
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
