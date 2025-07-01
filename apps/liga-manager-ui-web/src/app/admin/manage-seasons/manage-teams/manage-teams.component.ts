import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ManageSeasonBase } from '../manage-season.base';
import { firstValueFrom } from 'rxjs';
import { AddTeamToSeasonMutationVariables } from '@liga-manager-api/graphql';
import { CypressSelectorDirective } from '../../../shared/directives/cypress-selector/cypress-selector.directive';

@Component({
    selector: 'lima-manage-teams',
    standalone: true,
    imports: [
        AsyncPipe,
        MatButtonModule,
        MatIconModule,
        CypressSelectorDirective,
    ],
    templateUrl: './manage-teams.component.html',
})
export class ManageTeamsComponent extends ManageSeasonBase {

    async addTeamToSeason(variables: AddTeamToSeasonMutationVariables) {
        try {
            await firstValueFrom(this.seasonService.addTeamToSeason(variables));
        } catch (_error) {
            //
        }
    }

    async removeTeamFromSeason(variables: AddTeamToSeasonMutationVariables) {
        try {
            await firstValueFrom(
                this.seasonService.removeTeamFromSeason(variables),
            );
        } catch (_error) {
            //
        }
    }

}
