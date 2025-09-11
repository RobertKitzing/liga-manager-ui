import { Component, inject, signal } from '@angular/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { ConfirmComponent, defaultDialogConfig, EditPenaltyComponent, EditPenaltyDialogData, TeamSearchComponent } from '@liga-manager-ui/components';
import { MatIconModule } from '@angular/material/icon';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, firstValueFrom, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'lima-manage-penalties',
    standalone: true,
    imports: [
        MatCardContent,
        MatCardModule,
        TeamSearchComponent,
        MatIconModule,
        MatTableModule,
        AsyncPipe,
        MatButtonModule,
    ],
    templateUrl: './manage-penalties.component.html',
})
export class ManagePenaltiesComponent extends ManageSeasonBaseComponent {

    private translateService = inject(TranslateService);

    teams = signal<Maybe<Maybe<Team>[]> | undefined>([]);

    displayedColumns = [ 'team', 'penalty_reason', 'penalty_points', 'action' ];

    penaltyTrigger = new BehaviorSubject(this.teams());

    penalties$ = this.penaltyTrigger.pipe(
        switchMap(
            () => this.seasonService.getSeasonPenalties({ id: this.season?.id || '' }),
        ),
    );

    editPenalty() {

        const data: EditPenaltyDialogData = {
            teams: this.teams() || [],
            seasonId: this.season?.id,
        };

        this.dialog.open(EditPenaltyComponent, {
            data,
        });
    }

    removePenalty(ranking_penalty_id: string) {
        this.dialog.open(ConfirmComponent,
            {
                ...defaultDialogConfig,
                data: {
                    body: this.translateService.instant('ARE_YOU_SURE_TO_DELETE_THIS_PENALTY'),
                },
            },
        ).afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                async (result) => {
                    if (result) {
                        try {
                            await firstValueFrom(this.seasonService.removePenalty({ ranking_penalty_id, season_id: this.season?.id || '' }));
                        } catch (error) {
                            console.error(error);
                        }
                    }
                },
            );
    }

}
