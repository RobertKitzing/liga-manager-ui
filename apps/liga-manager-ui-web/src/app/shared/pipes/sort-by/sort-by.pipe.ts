import { Pipe, PipeTransform } from '@angular/core';
import { sortArrayBy } from '@liga-manager-ui/utils';

@Pipe({
    name: 'sortBy',
    standalone: true,
})
export class SortByPipe implements PipeTransform {

    transform(value: unknown[], key: string, dir: 'asc' | 'desc' = 'asc') {
        return sortArrayBy(value, key, dir);
    }

}
