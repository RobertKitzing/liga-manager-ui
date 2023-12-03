import { Component } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { AuthenticationService, TeamService } from '@lima/shared/services';

@Component({
    selector: 'lima-teams-managment',
    templateUrl: './teams-management.component.html',
    styles: [],
})
export class TeamsManagementComponent {

    teams$ = 
        this.authenticationService.isAdmin ?
        this.teamService.allTeams$ :
        of(this.authenticationService.user?.teams);

    constructor(
        private authenticationService: AuthenticationService,
        private teamService: TeamService,
    ) {}

    async onFileSelected(event: Event, teamId: string) {
        const element = event.currentTarget as HTMLInputElement;

        if (element.files) {
            const file = element.files[0];
            if (file) {
                await firstValueFrom(
                    this.teamService.uploadTeamLogo(teamId, file),
                );
                // this.fileName = file.name;

                // const formData = new FormData();

                // formData.append("thumbnail", file);

                // const upload$ = this.http.post("/api/thumbnail-upload", formData);

                // upload$.subscribe();
            }
        }
    }

}
