import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finalround'
})
export class FinalroundPipe implements PipeTransform {

  transform(matchDay: number, roundLength: number): any {
    console.log(roundLength);
    switch (roundLength) {
      case 8:
        return 'Achtelfinale';
      case 4:
        return 'Viertelfinale';
      case 2:
        return 'Halbfinale';
      case 1:
        return 'Finale';
      default:
        return 'Runde ' + matchDay.toString();
    }
  }

}
