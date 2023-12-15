import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TournamentChooserComponent } from '@lima/shared/components';

@Component({
    selector: 'lima-tournament',
    templateUrl: './tournament.component.html',
    imports: [
        MatToolbarModule,
        TournamentChooserComponent,
    ],
    standalone: true,
})
export class TournamentComponent {}
