import { Pipe, PipeTransform } from '@angular/core';
import { _ } from '@biesbjerg/ngx-translate-extract';

@Pipe({
  name: 'finalround'
})
export class FinalroundPipe implements PipeTransform {

  transform(matchDay: number, roundLength: number): any {
    switch (roundLength) {
      case 8:
        return _('ACHTELFINALE');
      case 4:
        return _('VIERTELFINALE');
      case 2:
        return _('HALBFINALE');
      case 1:
        return _('FINALE');
      default:
        return matchDay.toString();
    }
  }

}
