import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Team } from '@liga-manager-api/graphql';
import { TeamLogoComponent } from '../team-logo';
import { Share } from '@capacitor/share';
import { APP_ROUTES } from '@liga-manager-ui/common';
import { AppsettingsService } from '@liga-manager-ui/services';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lima-team-contact',
    standalone: true,
    imports: [
        MatIconModule,
        MatCardModule,
        TeamLogoComponent,
        AsyncPipe,
    ],
    templateUrl: './team-contact.component.html',
})
export class TeamContactComponent {

    private appsettingsService = inject(AppsettingsService);

    canShare = Share.canShare();

    @Input() team!: Team;

    @Input() showTitle = true;

    async share() {
        const url = `${this.appsettingsService.host}/${APP_ROUTES.TEAM}?teamid=${this.team.id}`;
        await Share.share({
            url,
        });
    }

}
