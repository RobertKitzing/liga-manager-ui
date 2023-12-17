import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'number',
    standalone: true,
})
export class NumberPipe implements PipeTransform {

    transform(value: string | number | undefined | null) {
        return typeof value === 'number' ? +value : '-';
    }

}
