import { Pipe, PipeTransform } from '@angular/core';
import { sortArrayBy } from '@lima/shared/utils';

@Pipe({
  name: 'sortBy',
  standalone: true,
})
export class SortByPipe implements PipeTransform {

  transform(value: any[], key: string, dir: 'asc' | 'desc' = 'asc' ) {
    return sortArrayBy(value, key, dir);
  }

}
