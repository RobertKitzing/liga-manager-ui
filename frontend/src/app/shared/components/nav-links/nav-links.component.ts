import { Component } from '@angular/core';
import { APP_ROUTES } from '@lima/app.routes.enum';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AuthenticationService } from '@lima/shared/services';

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
        public authenticationService: AuthenticationService,
    ) {}

}
