import { inject, Pipe, PipeTransform } from '@angular/core';
import { Team } from '@liga-manager-api/graphql';
import { AppsettingsService } from '@liga-manager-ui/services';

@Pipe({
    name: 'teamLogo',
    standalone: true,
})
export class TeamLogoPipe implements PipeTransform {

    private appsettingsService = inject(AppsettingsService);

    transform(team: Pick<Team, 'logo_id'>): string {
        if (team.logo_id) {
            return `${this.appsettingsService.appsettings?.host || ''}/logos/${team.logo_id}.webp`;
        } else {
            return '/assets/default_team_logo_200x200.webp';
        }
    }

}
