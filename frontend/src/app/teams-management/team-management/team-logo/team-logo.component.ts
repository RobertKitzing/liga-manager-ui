import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, TeamService } from '@lima/shared/services';
import { firstValueFrom, map, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TeamLogoPipe } from '@lima/shared/pipes/team-logo';

@Component({
    selector: 'lima-team-logo',
    templateUrl: './team-logo.component.html',
    styleUrls: ['./team-logo.component.scss'],
    standalone: true,
    imports: [
      TranslateModule, AsyncPipe, TeamLogoPipe,
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
    public authenticationService: AuthenticationService,
  ) {
  }

  async onFileSelected(event: Event, teamId: string) {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files) {
      const file = element.files[0];
      if (file) {
        await firstValueFrom(
          this.teamService.uploadTeamLogo(teamId, file),
        );
      }
    }
  }

}
