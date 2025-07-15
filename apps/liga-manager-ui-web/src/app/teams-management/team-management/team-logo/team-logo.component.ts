import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    AuthenticationService,
    NotificationService,
    TeamService,
} from '@liga-manager-ui/services';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LogosService } from '@liga-manager-api/openapi'

@Component({
    selector: 'lima-team-logo',
    templateUrl: './team-logo.component.html',
    standalone: true,
    imports: [
        TranslateModule,
        AsyncPipe,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
    ],
})
export class TeamLogoComponent {

    authenticationService = inject(AuthenticationService);

    private activatedRoute = inject(ActivatedRoute);

    private teamService = inject(TeamService);

    private notificationService = inject(NotificationService);

    private logosService = inject(LogosService);

    imageSrc = '';

    team$ = this.activatedRoute.parent?.paramMap.pipe(
        map((p) => {
            const teamId = p.get('teamId')!;
            this.reloadImage(teamId);
            return teamId;
        }),
        switchMap((teamId) => this.teamService.getTeamById(teamId)),
    );

    reloadImage(teamId: string) {
        this.imageSrc = `/api/logos?teamId=${teamId}&timestamp=${Date.now()}`;
    }

    async onFileSelected(event: Event, teamId: string) {
        const element = event.currentTarget as HTMLInputElement;
        if (element.files) {
            const file = element.files[0];
            if (file) {
                try {
                    await firstValueFrom(
                        this.teamService.uploadTeamLogo(teamId, file),
                    );
                    this.reload(teamId);
                    this.notificationService.showSuccessNotification(
                        marker('UPLOAD_TEAM_LOGO_SUCCESS'),
                    );
                } catch (_error) {
                    this.notificationService.showErrorNotification(
                        marker('UPLOAD_TEAM_LOGO_ERROR'),
                    );
                }
            }
        }
    }

    async deleteTeamLogo(teamId: string) {
        try {
            await firstValueFrom(this.teamService.deleteTeamLogo(teamId));
            this.reload(teamId);
            this.notificationService.showSuccessNotification(
                marker('DELETE_TEAM_LOGO_SUCCESS'),
            );
        } catch (_error) {
            this.notificationService.showErrorNotification(
                marker('DELETE_TEAM_LOGO_ERROR'),
            );
        }
    }

    private reload(teamId: string) {
        this.teamService.refetchAllTeams();
        this.teamService.refetchTeamById(teamId);
        this.reloadImage(teamId);
    }

}
