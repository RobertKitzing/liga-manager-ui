import { Pipe, PipeTransform } from '@angular/core';
import { AppsettingsService } from '@lima/shared/services/appsettings.service';

@Pipe({
  name: 'teamLogo',
  standalone: true,
})
export class TeamLogoPipe implements PipeTransform {

  constructor(
    private appsettingsService: AppsettingsService,
  ) {

  }

  transform(logoId: string): unknown {
    return `${this.appsettingsService.appsettings?.host || ''}/logos/${logoId}.webp`;
  }

}
