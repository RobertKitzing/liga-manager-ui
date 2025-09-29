import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Team } from '@liga-manager-api/graphql';
import { TeamLogoComponent } from '../team-logo';
import { Share } from '@capacitor/share';
import { AsyncPipe } from '@angular/common';
import { ShareService } from '@liga-manager-ui/services';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'lima-team-contact',
    standalone: true,
    imports: [
        MatIconModule,
        MatCardModule,
        TeamLogoComponent,
        AsyncPipe,
        MatButtonModule,
    ],
    templateUrl: './team-contact.component.html',
})
export class TeamContactComponent {

    canShare = Share.canShare();

    private shareService = inject(ShareService);

    @Input() team!: Team;

    @Input() showTitle = true;

    share() {
        this.shareService.shareContact(this.team.id);
    }

}
