import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'number',
})
export class NumberPipe implements PipeTransform {

    transform(value: string | number): number | undefined {
        return typeof value === 'number' ? +value : undefined;
    }

}
