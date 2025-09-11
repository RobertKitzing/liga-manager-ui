import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { AddTeamToSeasonMutationVariables, Maybe, Team } from '@liga-manager-api/graphql';
import { TranslateModule } from '@ngx-translate/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { defaultDialogConfig, TeamAutoCompleteComponent, TeamSearchComponent } from '@liga-manager-ui/components';
import { ReactiveFormsModule } from '@angular/forms';
import { ReplaceTeamComponent } from './replace-team/replace-team.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'lima-manage-teams',
    standalone: true,
    imports: [
        AsyncPipe,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        TeamSearchComponent,
        TeamAutoCompleteComponent,
        ReactiveFormsModule,
        MatCardModule,
    ],
    templateUrl: './manage-teams.component.html',
})
export class ManageTeamsComponent extends ManageSeasonBaseComponent {

    allTeams$ = this.teamService.allTeams$;

    seasonTeams = signal<Maybe<Maybe<Team>[]> | undefined>([]);

    async addTeamToSeason(variables: AddTeamToSeasonMutationVariables) {
        await firstValueFrom(this.seasonService.addTeamToSeason(variables));
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

    replaceTeamInSeason(teamToBeReplaced: Team) {
        this.dialog.open(ReplaceTeamComponent, {
            ...defaultDialogConfig,
            data: {
                seasonId: this.season?.id,
                teamToBeReplaced,
            },
        });
    }

}
