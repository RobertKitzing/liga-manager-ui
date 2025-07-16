import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Team } from '@liga-manager-api/graphql';
import { TeamLogoComponent } from '../team-logo';

@Component({
    selector: 'lima-team-contact',
    standalone: true,
    imports: [
        MatIconModule,
        MatCardModule,
        TeamLogoComponent,
    ],
    templateUrl: './team-contact.component.html',
})
export class TeamContactComponent {

    @Input() team!: Team;

    @Input() showTitle = true;

}
