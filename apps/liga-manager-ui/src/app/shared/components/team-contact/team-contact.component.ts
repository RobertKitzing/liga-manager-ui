import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Team } from '@liga-manager-api/graphql';
import { TeamLogoPipe } from '@liga-manager-ui/pipes';

@Component({
    selector: 'lima-team-contact',
    standalone: true,
    imports: [TeamLogoPipe, MatIconModule],
    templateUrl: './team-contact.component.html',
})
export class TeamContactComponent {
    @Input() team!: Team;

    @Input() showTitle = true;
}
