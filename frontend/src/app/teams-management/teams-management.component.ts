import { Component } from '@angular/core';
import {  iif, of, tap } from 'rxjs';
import { AuthenticationService, TeamService } from '@lima/shared/services';
import { AsyncPipe } from '@angular/common';
import { RouterLinkActive, RouterLink, RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TeamChooserComponent } from '@lima/shared/components';
import { APP_ROUTES } from '@lima/app.routes.enum';
import { LocalStorage } from 'ngx-webstorage';
import { Team } from '@api/graphql';

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
        TeamChooserComponent,
        ReactiveFormsModule,
    ],
})
export class TeamsManagementComponent {

    @LocalStorage()
    selectedTeamLS!: Team | null;

    selectedTeamFC = new FormControl<Team | null>(this.selectedTeamLS);

    selectedTeam$ = this.selectedTeamFC.valueChanges.pipe(
        tap(
            (team) => {
                if (team?.id) {
                    this.router.navigateByUrl(`${APP_ROUTES.TEAMS_MANAGEMENT}/${team.id}`);
                } else {
                    this.router.navigateByUrl(`${APP_ROUTES.TEAMS_MANAGEMENT}`)
                }
                this.selectedTeamLS = team;
            },
        ),
    );

    teams$ = 
        iif(
            () => this.authenticationService.isAdmin,
            this.teamService.allTeams$,
            of(this.authenticationService.user?.teams),
        ).pipe(
            tap(
                (teams) => {
                    // if (!this.selectedTeamFC.value) {
                    this.selectedTeamFC.setValue(teams![0])
                    this.router.navigateByUrl(`${APP_ROUTES.TEAMS_MANAGEMENT}/${teams![0]?.id}`);
                    // }
                },
            ),
        )

    constructor(
        private authenticationService: AuthenticationService,
        private teamService: TeamService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

}
