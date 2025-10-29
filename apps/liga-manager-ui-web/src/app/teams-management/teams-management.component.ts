import { Component, DestroyRef, inject } from '@angular/core';
import { iif, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
    RouterOutlet,
    Router,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamAutoCompleteComponent } from '@liga-manager-ui/components';
import { APP_ROUTES } from '@liga-manager-ui/common';
import { Store } from '@ngxs/store';
import { AuthStateSelectors, SelectedItemsSelectors, SetSelectedTeam, TeamSelectors } from '@liga-manager-ui/states';
import { MatTabsModule } from '@angular/material/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'lima-teams-managment',
    templateUrl: './teams-management.component.html',
    styles: [],
    standalone: true,
    imports: [
        TranslateModule,
        MatToolbarModule,
        RouterOutlet,
        AsyncPipe,
        ReactiveFormsModule,
        TeamAutoCompleteComponent,
        FormsModule,
        MatTabsModule,
    ],
})
export class TeamsManagementComponent {

    private router = inject(Router);

    private store = inject(Store);

    private destroyRef = inject(DestroyRef);

    selectedTeamFC = new FormControl();

    teams$ = iif(
        () => this.store.selectSnapshot(AuthStateSelectors.isAdmin),
        this.store.select(TeamSelectors.teams),
        this.store.select(AuthStateSelectors.userTeams),
    ).pipe(
        tap((teams) => {
            const selectedTeamId = this.store.selectSnapshot(SelectedItemsSelectors.selectedTeamId('team-management'));
            if (!selectedTeamId) {
                this.selectedTeamFC.setValue(teams?.at(0), { emitEvent: false });
                this.router.navigate([ APP_ROUTES.TEAMS_MANAGEMENT, teams?.at(0)?.id ]);
            } else {
                this.selectedTeamFC.setValue(teams?.find((t) => t?.id === selectedTeamId), { emitEvent: false });
                this.router.navigate([ APP_ROUTES.TEAMS_MANAGEMENT, selectedTeamId ]);
            }
        }),
    );

    constructor() {

        this.selectedTeamFC.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (team) => {
                if (team) {
                    this.router.navigate([ APP_ROUTES.TEAMS_MANAGEMENT, team?.id ]);
                }
                this.store.dispatch(new SetSelectedTeam('team-management', team?.id));
            },
        );
    }

}
