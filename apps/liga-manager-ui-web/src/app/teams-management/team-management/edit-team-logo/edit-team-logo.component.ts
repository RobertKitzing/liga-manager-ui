import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    AppsettingsService,
    AuthenticationService,
    NotificationService,
    TeamService,
} from '@liga-manager-ui/services';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamLogoComponent } from '@liga-manager-ui/components';
import { Configuration } from '@liga-manager-api/openapi';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
    selector: 'lima-edit--team-logo',
    templateUrl: './edit-team-logo.component.html',
    standalone: true,
    imports: [
        TranslateModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        TeamLogoComponent,
        ReactiveFormsModule,
        CypressSelectorDirective,
    ],
})
export class EditTeamLogoComponent {

    authenticationService = inject(AuthenticationService);

    private appsettingsService = inject(AppsettingsService);

    private activatedRoute = inject(ActivatedRoute);

    private teamService = inject(TeamService);

    private notificationService = inject(NotificationService);

    private configuration = inject(Configuration);

    team$ = this.activatedRoute.parent?.paramMap.pipe(
        map((p) => {
            const teamId = p.get('teamId')!;
            return teamId;
        }),
        switchMap((teamId) => this.teamService.getTeamById(teamId)),
    );

    team = toSignal(this.team$!);

    previewImage = signal<string | null>(null);

    async saveTeamLogo(teamId?: string) {
        if (!teamId) {
            return;
        }
        try {
            this.configuration.basePath = this.appsettingsService.appsettings?.host || '';
            this.configuration.credentials = { bearerAuth: this.authenticationService.accessToken() || '' };
            await this.teamService.uploadTeamLogo(teamId, this.previewImage()!);
            this.reload(teamId);
            this.notificationService.showSuccessNotification(
                marker('UPLOAD_TEAM_LOGO_SUCCESS'),
            );
            this.previewImage.set(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            const message = error.error.errors[0].message || '';
            this.notificationService.showErrorNotification(
                marker('UPLOAD_TEAM_LOGO_ERROR'),
                [message],
            );
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

    async chooseFile() {
        const result = await FilePicker.pickMedia({ readData: true, limit: 1  });
        const file = result.files[0];
        this.previewImage.set( `data:${file.mimeType};base64, ${file.data}` );
    }

}
