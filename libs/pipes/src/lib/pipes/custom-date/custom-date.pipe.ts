import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '@liga-manager-ui/services';

@Pipe({
    name: 'customDate',
    pure: false,
})
export class CustomDatePipe implements PipeTransform {

    private date = inject(DatePipe);

    private i18nService = inject(I18nService);

    transform(
        value: string | number | Date | undefined | null,
        format = 'shortDate',
        timezone: string | undefined = undefined,
    ): string | null {
        if (!value) {
            return '';
        }
        return this.date.transform(
            value,
            format,
            timezone,
            this.i18nService.currentLang,
        );
    }

}
