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
import { AddTeamToSeason, TeamSelectors } from '@liga-manager-ui/states';

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

    allTeams$ = this.store.select(TeamSelectors.teams);

    seasonTeams = signal<Maybe<Maybe<Team>[]> | undefined>([]);

    addTeamToSeason(variables: AddTeamToSeasonMutationVariables, teamName: string, seasonName: string) {
        this.store.dispatch(new AddTeamToSeason(variables, teamName, seasonName));
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
