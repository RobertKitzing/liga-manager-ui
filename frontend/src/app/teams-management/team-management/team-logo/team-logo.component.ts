import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '@lima/shared/services';
import { firstValueFrom, map, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lima-team-logo',
    templateUrl: './team-logo.component.html',
    styleUrls: ['./team-logo.component.scss'],
    standalone: true,
    imports: [AsyncPipe],
})
export class TeamLogoComponent {

  teamId$ = this.activatedRoute.parent?.parent?.paramMap.pipe(
    map(
      (p) => p.get('teamId'),
    ),
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
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
