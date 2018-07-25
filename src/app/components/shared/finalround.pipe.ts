import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finalround'
})
export class FinalroundPipe implements PipeTransform {

  transform(matchDay: number, roundLength: number): any {
    switch (roundLength) {
      case 8:
        return '';
      case 4:
        return '';
      case 2:
        return '';
      case 1:
        return '';
      default:
        return matchDay.toString();
    }
  }

}
