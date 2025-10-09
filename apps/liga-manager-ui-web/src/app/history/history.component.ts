import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';

@Component({
    selector: 'lima-history',
    templateUrl: './history.component.html',
    imports: [
        MatToolbarModule,
        RouterLink,
        RouterLinkActive,
        TranslateModule,
        RouterOutlet,
        CypressSelectorDirective,
    ],
    standalone: true,
})
export class HistoryComponent {}
