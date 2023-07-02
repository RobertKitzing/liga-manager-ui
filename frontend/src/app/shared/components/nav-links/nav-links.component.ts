import { Component } from '@angular/core';
import { APP_ROUTES } from 'src/app';
import { AdminGuard } from 'src/app/admin/admin.guard';
import { TeamAdminGuard } from 'src/app/team-admin/team-admin.guard';

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
