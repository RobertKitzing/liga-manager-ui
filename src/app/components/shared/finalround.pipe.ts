import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finalround'
})
export class FinalroundPipe implements PipeTransform {

  transform(matchDay: number, roundLength: number): any {
    switch (roundLength) {
      case 8:
        return 'ACHTELFINALE';
      case 4:
        return 'VIERTELFINALE';
      case 2:
        return 'HALBFINALE';
      case 1:
        return 'FINALE';
      default:
        return matchDay.toString();
    }
  }

}
