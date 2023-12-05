import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TEAM_MANAGEMENT_ROUTES } from './team-management.routes';

@Component({
    selector: 'lima-team-management',
    templateUrl: './team-management.component.html',
    styleUrls: ['./team-management.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, RouterLink, RouterLinkActive, RouterOutlet],
})
export class TeamManagementComponent {

    TEAM_MANAGEMENT_ROUTES = TEAM_MANAGEMENT_ROUTES;

}
