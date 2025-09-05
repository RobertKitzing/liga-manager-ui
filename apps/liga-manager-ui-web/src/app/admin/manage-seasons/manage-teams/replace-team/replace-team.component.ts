import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Team } from '@liga-manager-api/graphql';
import { TeamAutoCompleteComponent } from '@liga-manager-ui/components';
import { SeasonService, TeamService } from '@liga-manager-ui/services';

@Component({
    selector: 'lima-replace-team',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        AsyncPipe,
        TeamAutoCompleteComponent,
    ],
    templateUrl: './replace-team.component.html',
})
export class ReplaceTeamComponent {

    data = inject<{ seasonId: string, teamToBeReplaced: Team}>(MAT_DIALOG_DATA);

    dialogRef = inject(MatDialogRef<ReplaceTeamComponent>);

    seasonService = inject(SeasonService);

    teamService = inject(TeamService);

    replaceWithTeamId = signal<string | undefined>(undefined);

    async replaceTeamInSeason() {
        try {
            await this.seasonService.replaceTeamInSeason({
                season_id: this.data.seasonId,
                current_team_id: this.data.teamToBeReplaced.id,
                replacement_team_id: this.replaceWithTeamId()!,
            });
            this.dialogRef.close();
        } catch(error) {
            console.error(error);
        }
    }

}
