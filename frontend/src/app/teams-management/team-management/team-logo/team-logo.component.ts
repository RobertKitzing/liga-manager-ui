import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, NotificationService, TeamService } from '@lima/shared/services';
import { firstValueFrom, map, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TeamLogoPipe } from '@lima/shared/pipes/team-logo';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'lima-team-logo',
    templateUrl: './team-logo.component.html',
    standalone: true,
    imports: [
      TranslateModule, AsyncPipe, TeamLogoPipe, MatButtonModule, MatIconModule
    ],
})
export class TeamLogoComponent {

  teamId$ = this.activatedRoute.parent?.paramMap.pipe(
    map(
      (p) => p.get('teamId'),
    ),
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    private notificationService: NotificationService,
    public authenticationService: AuthenticationService,
  ) {
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
          this.notificationService.showSuccessNotification(
            marker('UPLOAD_TEAM_LOGO_SUCCESS'),
          )
          
        } catch (error) {
          this.notificationService.showErrorNotification(
            marker('UPLOAD_TEAM_LOGO_ERROR'),
          )
        }
      }
    }
  }

  async deleteTeamLogo(teamId: string) {
    try {
      await firstValueFrom(
        this.teamService.deleteTeamLogo(teamId),
      );
      this.notificationService.showSuccessNotification(
        marker('DELETE_TEAM_LOGO_SUCCESS'),
      )
      
    } catch (error) {
      this.notificationService.showErrorNotification(
        marker('DELETE_TEAM_LOGO_ERROR'),
      )
    }
  }

}
