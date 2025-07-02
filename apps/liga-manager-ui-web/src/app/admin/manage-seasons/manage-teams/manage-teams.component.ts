import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { AddTeamToSeasonMutationVariables, Maybe, Team } from '@liga-manager-api/graphql';
import { CypressSelectorDirective } from '../../../shared/directives/cypress-selector/cypress-selector.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { TeamSearchComponent } from '@liga-manager-ui/components';

@Component({
    selector: 'lima-manage-teams',
    standalone: true,
    imports: [
        AsyncPipe,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        CypressSelectorDirective,
        TeamSearchComponent,
    ],
    templateUrl: './manage-teams.component.html',
})
export class ManageTeamsComponent extends ManageSeasonBaseComponent {

    seasonTeams = signal<Maybe<Maybe<Team>[]> | undefined>([]);

    allTeams = signal<Maybe<Maybe<Team>[]> | undefined>([]);

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
