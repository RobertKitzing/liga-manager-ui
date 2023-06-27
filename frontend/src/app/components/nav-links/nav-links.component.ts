import { Component } from '@angular/core';
import { AdminGuard } from 'src/app/admin/admin.guard';
import { TeamAdminGuard } from 'src/app/team-admin/team-admin.guard';

@Component({
    selector: 'lima-nav-links',
    templateUrl: './nav-links.component.html',
    styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent {
    constructor(
        public adminGuard: AdminGuard,
        public teamAdminGuard: TeamAdminGuard
    ) {}
}
