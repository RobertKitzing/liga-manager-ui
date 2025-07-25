import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { TEAM_MANAGEMENT_ROUTES } from '../teams-management.routes';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';

@Component({
    selector: 'lima-team-management',
    templateUrl: './team-management.component.html',
    standalone: true,
    imports: [
        TranslateModule,
        MatToolbarModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        CypressSelectorDirective,
    ],
})
export class TeamManagementComponent {

    TEAM_MANAGEMENT_ROUTES = TEAM_MANAGEMENT_ROUTES;

}
