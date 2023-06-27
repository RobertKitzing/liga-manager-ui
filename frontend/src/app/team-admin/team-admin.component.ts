import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TeamLogoService } from 'src/api/openapi';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'lima-team-admin',
    templateUrl: './team-admin.component.html',
    styles: [],
})
export class TeamAdminComponent {
    teams = this.authenticationService.user?.teams;

    constructor(
        private authenticationService: AuthenticationService,
        private teamService: TeamLogoService
    ) {}

    async commitPreview(teamId: string) {
        await firstValueFrom(this.teamService.commitPreview(teamId));
    }

    async onFileSelected(event: any, teamId: string) {
        const file: File = event.target?.files![0];

        if (file) {
            await firstValueFrom(this.teamService.uploadTeamLogo(teamId, file));
            // this.fileName = file.name;

            // const formData = new FormData();

            // formData.append("thumbnail", file);

            // const upload$ = this.http.post("/api/thumbnail-upload", formData);

            // upload$.subscribe();
        }
    }
}
