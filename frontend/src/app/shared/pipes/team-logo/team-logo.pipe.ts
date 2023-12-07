import { Pipe, PipeTransform } from '@angular/core';
import { AppsettingsService } from '@lima/shared/services';

@Pipe({
  name: 'teamLogo',
  standalone: true,
})
export class TeamLogoPipe implements PipeTransform {

  constructor(
    private appsettingsService: AppsettingsService,
  ) {

  }

  transform(logoId: string): string {
    return `${this.appsettingsService.appsettings?.host || ''}/api/logos?teamId=${logoId}`;
    // return `${this.appsettingsService.appsettings?.host || ''}/logos/${logoId}.webp`;
  }

}
