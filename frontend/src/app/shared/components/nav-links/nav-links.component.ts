import { Component } from '@angular/core';
import { AdminGuard } from '@lima/admin';
import { APP_ROUTES } from '@lima/app-routes';
import { TeamAdminGuard } from '@lima/team-admin';

@Component({
    selector: 'lima-nav-links',
    templateUrl: './nav-links.component.html',
    styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent {

    APP_ROUTES = APP_ROUTES;

    constructor(
        public adminGuard: AdminGuard,
        public teamAdminGuard: TeamAdminGuard,
    ) {}

}
