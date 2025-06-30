import { Pipe, PipeTransform } from '@angular/core';
import { sortArrayBy } from '@liga-manager-ui/utils';

@Pipe({
    name: 'sortBy',
    standalone: true,
})
export class SortByPipe implements PipeTransform {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(value: any[], key: string, dir: 'asc' | 'desc' = 'asc') {
        return sortArrayBy(value, key, dir);
    }

}
