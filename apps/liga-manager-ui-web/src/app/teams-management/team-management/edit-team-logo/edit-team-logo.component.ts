import { Component, inject, input, signal } from '@angular/core';
import {
    NotificationService,
    TeamService,
} from '@liga-manager-ui/services';
import { firstValueFrom } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamLogoComponent } from '@liga-manager-ui/components';
import { Configuration } from '@liga-manager-api/openapi';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Store } from '@ngxs/store';
import { AppSettingsSelectors, AuthStateSelectors } from '@liga-manager-ui/states';
import { AsyncPipe } from '@angular/common';
import { Team } from '@liga-manager-api/graphql';

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
        AsyncPipe,
    ],
})
export class EditTeamLogoComponent {

    private store = inject(Store);

    private teamService = inject(TeamService);

    private notificationService = inject(NotificationService);

    private configuration = inject(Configuration);

    isAdmin$ = this.store.select(AuthStateSelectors.isAdmin);

    team = input<Team>();

    previewImage = signal<string | null>(null);

    async saveTeamLogo(teamId?: string) {
        if (!teamId) {
            return;
        }
        try {
            this.configuration.basePath = this.store.selectSnapshot(AppSettingsSelectors.host);
            this.configuration.credentials = { bearerAuth: this.store.selectSnapshot(AuthStateSelectors.properties.token) || '' };
            await this.teamService.uploadTeamLogo(teamId, this.previewImage()!);
            this.reload(teamId);
            this.notificationService.showSuccessNotification(
                marker('SUCCESS.UPLOAD_TEAM_LOGO'),
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
                marker('SUCCESS.DELETE_TEAM_LOGO'),
            );
        } catch (error) {
            console.error(error);
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
