import { Component, Inject, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    AuthenticationService,
    NotificationService,
    TeamService,
} from '@liga-manager-ui/services';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TeamLogoPipe } from '@liga-manager-ui/pipes';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'lima-team-logo',
    templateUrl: './team-logo.component.html',
    standalone: true,
    imports: [
        TranslateModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        TeamLogoPipe,
        NgOptimizedImage,
        ReactiveFormsModule,
    ],
})
export class TeamLogoComponent {

    authenticationService = inject(AuthenticationService);

    private activatedRoute = inject(ActivatedRoute);

    private teamService = inject(TeamService);

    private notificationService = inject(NotificationService);

    team$ = this.activatedRoute.parent?.paramMap.pipe(
        map((p) => {
            const teamId = p.get('teamId')!;
            return teamId;
        }),
        switchMap((teamId) => this.teamService.getTeamById(teamId)),
    );

    team = toSignal(this.team$!)

    previewImage = signal<string | null>(null);

    file?: File;

    onFileSelected(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        if (element.files) {
            const file = element.files[0];
            this.previewImage.set( URL.createObjectURL(file) )
            this.file = file;
        }
    }

    async saveTeamLogo(teamId?: string) {
        if (!teamId) {
            return;
        }
        if (this.file) {
            try {
                await firstValueFrom(
                    this.teamService.uploadTeamLogo(teamId, this.file),
                );
                this.reload(teamId);
                this.notificationService.showSuccessNotification(
                    marker('UPLOAD_TEAM_LOGO_SUCCESS'),
                );
            } catch (error) {
                this.notificationService.showErrorNotification(
                    marker('UPLOAD_TEAM_LOGO_ERROR'),
                    [`${error}`],
                );
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
    }

}
