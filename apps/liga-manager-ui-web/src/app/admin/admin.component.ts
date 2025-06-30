import { Component } from '@angular/core';
import {
    Router,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ADMIN_ROUTES } from './admin.routes.enum';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';

@Component({
    selector: 'lima-admin',
    templateUrl: './admin.component.html',
    styles: [],
    standalone: true,
    imports: [
        MatToolbarModule,
        NgTemplateOutlet,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        TranslateModule,
        CypressSelectorDirective,
    ],
})
export class AdminComponent {
    ADMIN_ROUTES = ADMIN_ROUTES;

    constructor(private router: Router) {}

    get currentRoute() {
        const url = this.router.url.split('/')[2];
        return `NAVIGATION.ADMIN.${url?.toUpperCase()}`;
    }
}
