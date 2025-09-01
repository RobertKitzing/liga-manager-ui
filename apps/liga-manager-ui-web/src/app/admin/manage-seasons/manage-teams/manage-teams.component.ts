import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { AddTeamToSeasonMutationVariables, Maybe, Team } from '@liga-manager-api/graphql';
import { TranslateModule } from '@ngx-translate/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { defaultDialogConfig, TeamAutoCompleteComponent, TeamSearchComponent } from '@liga-manager-ui/components';
import { ReactiveFormsModule } from '@angular/forms';
import { ReplaceTeamComponent } from './replace-team/replace-team.component';

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
    ],
    templateUrl: './manage-teams.component.html',
})
export class ManageTeamsComponent extends ManageSeasonBaseComponent {

    seasonTeams = signal<Maybe<Maybe<Team>[]> | undefined>([]);

    allTeams = signal<Maybe<Maybe<Team>[]> | undefined>([]);

    destroyRef = inject(DestroyRef)

    addTeamToSeason(variables: AddTeamToSeasonMutationVariables) {
        firstValueFrom(this.seasonService.addTeamToSeason(variables))
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
        })
    }

}
