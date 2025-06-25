import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '@lima/shared/services';

@Pipe({
    name: 'customDate',
    pure: false,
})
export class CustomDatePipe implements PipeTransform {

    constructor(private date: DatePipe, private i18nService: I18nService) { }

    transform(
        value: string | number | Date | undefined,
        format = 'shortDate',
    ): string | null {
        return this.date.transform(
            value,
            format,
            undefined,
            this.i18nService.currentLang,
        );
    }

}
