import { Component, inject } from '@angular/core';
import { iif, of, tap } from 'rxjs';
import { AuthenticationService, fromStorage, TeamService } from '@liga-manager-ui/services';
import { AsyncPipe } from '@angular/common';
import {
    RouterOutlet,
    Router,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamAutoCompleteComponent } from '@liga-manager-ui/components';
import { Team } from '@liga-manager-api/graphql';
import { APP_ROUTES, StorageKeys } from '@liga-manager-ui/common';

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
    ],
})
export class TeamsManagementComponent {

    private authenticationService = inject(AuthenticationService);

    private teamService = inject(TeamService)

    private router = inject(Router)

    selectedTeamLS = fromStorage<Team>(StorageKeys.TEAMS_MANAGMENT_SELECTED_TEAM);

    selectedTeamFC = new FormControl(this.selectedTeamLS());

    selectedTeam$ = this.selectedTeamFC.valueChanges.pipe(
        tap((team) => {
            if (team?.id) {
                this.router.navigateByUrl(
                    `${APP_ROUTES.TEAMS_MANAGEMENT}/${team.id}`,
                );
            } else {
                this.router.navigateByUrl(`${APP_ROUTES.TEAMS_MANAGEMENT}`);
            }
            this.selectedTeamLS.set(team);
        }),
    );

    teams$ = iif(
        () => this.authenticationService.isAdmin,
        this.teamService.allTeams$,
        of(this.authenticationService.user()?.teams),
    ).pipe(
        tap((teams) => {
            if (!this.selectedTeamFC.value) {
                this.selectedTeamFC.setValue(teams![0]);
                this.router.navigateByUrl(
                    `${APP_ROUTES.TEAMS_MANAGEMENT}/${teams![0]?.id}`,
                );
            }
        }),
    );

}
