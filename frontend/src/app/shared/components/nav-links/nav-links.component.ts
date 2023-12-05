import { Component } from '@angular/core';
import { AdminGuard } from '@lima/admin';
import { APP_ROUTES } from '@lima/app-routes';
import { TeamsManagementGuard } from '@lima/teams-management';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'lima-nav-links',
    templateUrl: './nav-links.component.html',
    styleUrls: ['./nav-links.component.scss'],
    standalone: true,
    imports: [
        RouterLinkActive,
        TranslateModule,
        RouterLink,
    ],
})
export class NavLinksComponent {

    APP_ROUTES = APP_ROUTES;

    constructor(
        public adminGuard: AdminGuard,
        public teamsManagementGuard: TeamsManagementGuard,
    ) {}

}
