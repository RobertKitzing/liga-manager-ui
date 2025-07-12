import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AuthenticationService } from '@liga-manager-ui/services';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { APP_ROUTES } from '@liga-manager-ui/common';

@Component({
    selector: 'lima-nav-links',
    templateUrl: './nav-links.component.html',
    styleUrls: ['./nav-links.component.scss'],
    standalone: true,
    imports: [
        RouterLinkActive,
        TranslateModule,
        RouterLink,
        CypressSelectorDirective,
    ],
})
export class NavLinksComponent {

    APP_ROUTES = APP_ROUTES;

    authenticationService = inject(AuthenticationService);

}
