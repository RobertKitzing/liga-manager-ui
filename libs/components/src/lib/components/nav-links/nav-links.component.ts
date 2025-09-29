import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { APP_ROUTES } from '@liga-manager-ui/common';
import { Store } from '@ngxs/store';
import { AuthStateSelectors } from '@liga-manager-ui/states';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lima-nav-links',
    templateUrl: './nav-links.component.html',
    standalone: true,
    imports: [
        RouterLinkActive,
        TranslateModule,
        RouterLink,
        CypressSelectorDirective,
        AsyncPipe,
    ],
})
export class NavLinksComponent {

    APP_ROUTES = APP_ROUTES;

    private store = inject(Store);

    isAdmin$ = this.store.select(AuthStateSelectors.isAdmin);

    isTeamAdmin$ = this.store.select(AuthStateSelectors.isTeamAdmin);

}
