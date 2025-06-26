import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TeamService } from '@lima/shared/services';
import { ManageSeasonBase } from '../manage-season.base';
import { firstValueFrom } from 'rxjs';
import { AddTeamToSeasonMutationVariables } from '@api/graphql';
import { CypressSelectorDirective } from '@lima/shared/directives';

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

    constructor(
      public teamService: TeamService,
    ) {
        super();
    }

    async addTeamToSeason(variables: AddTeamToSeasonMutationVariables) {
        try {
            await firstValueFrom(this.seasonService.addTeamToSeason(variables));
        } catch (error) {
            //
        }
    }

    async removeTeamFromSeason(variables: AddTeamToSeasonMutationVariables) {
        try {
            await firstValueFrom(this.seasonService.removeTeamFromSeason(variables));
        } catch (error) {
            //
        }
    }

}
