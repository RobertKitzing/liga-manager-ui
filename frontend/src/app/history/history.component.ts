import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'lima-history',
    templateUrl: './history.component.html',
    standalone: true,
    imports: [
        MatToolbarModule,
        RouterLink,
        RouterLinkActive,
        TranslateModule,
        RouterOutlet,
    ],
})
export class HistoryComponent {}
