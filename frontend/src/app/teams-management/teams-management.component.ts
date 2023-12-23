import { Component } from '@angular/core';
import { iif, of, tap } from 'rxjs';
import { AuthenticationService, TeamService } from '@lima/shared/services';
import { AsyncPipe } from '@angular/common';
import { RouterLinkActive, RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamChooserComponent } from '@lima/shared/components';
import { APP_ROUTES } from '@lima/app.routes.enum';

@Component({
    selector: 'lima-teams-managment',
    templateUrl: './teams-management.component.html',
    styles: [],
    standalone: true,
    imports: [
        TranslateModule,
        MatToolbarModule,
        RouterLinkActive,
        RouterLink,
        RouterOutlet,
        AsyncPipe,
        TeamChooserComponent,
        ReactiveFormsModule,
    ],
})
export class TeamsManagementComponent {

    teams$ = 
        iif(
            () => this.authenticationService.isAdmin,
            this.teamService.allTeams$,
            of(this.authenticationService.user?.teams),
        ).pipe(
            tap(
                (teams) => {
                    if (teams![0]) {
                        this.router.navigateByUrl(`${APP_ROUTES.TEAMS_MANAGEMENT}/${teams![0]?.id}`);
                    }
                },
            ),
        )

    constructor(
        private authenticationService: AuthenticationService,
        private teamService: TeamService,
        private router: Router,
    ) {}

}
