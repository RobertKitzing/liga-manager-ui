import { Component, signal } from '@angular/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { EditPenaltyComponent, EditPenaltyDialogData, TeamSearchComponent } from '@liga-manager-ui/components';
import { MatIconModule } from '@angular/material/icon';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { MatTableModule } from '@angular/material/table';
import { of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { RemovePenalty } from '@liga-manager-ui/states';
import { toObservable } from '@angular/core/rxjs-interop';

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
        CypressSelectorDirective,
    ],
    templateUrl: './manage-penalties.component.html',
})
export class ManagePenaltiesComponent extends ManageSeasonBaseComponent {

    teams = signal<Maybe<Maybe<Team>[]> | undefined>([]);

    displayedColumns = [ 'team', 'penalty_reason', 'penalty_points', 'action' ];

    penalties$ = toObservable(this.season).pipe(
        switchMap(
            (season) => {
                if (season) {
                    return this.seasonService.getSeasonPenalties({ id: season.id });
                }
                return of([]);
            },
        ),
    );

    editPenalty() {

        const data: EditPenaltyDialogData = {
            teams: this.teams() || [],
            seasonId: this.season()?.id,
        };

        this.dialog.open(EditPenaltyComponent, {
            data,
        });
    }

    removePenalty(ranking_penalty_id: string) {
        this.store.dispatch(new RemovePenalty({ ranking_penalty_id, season_id: this.season()?.id || ''}));
    }

}
