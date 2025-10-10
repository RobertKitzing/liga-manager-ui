import { Component, inject } from '@angular/core';
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
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { ADMIN_ROUTES } from '@liga-manager-ui/common';

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

    private router = inject(Router);

    get currentRoute() {
        const url = this.router.url.split('/')[2].split('?')[0];
        return `NAVIGATION_ADMIN.${url?.toUpperCase()}`;
    }

}
