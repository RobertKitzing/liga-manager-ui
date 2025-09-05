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
        value: string | number | Date | undefined,
        format = 'shortDate',
        timezone: string | undefined = undefined,
    ): string | null {
        return this.date.transform(
            value,
            format,
            timezone,
            this.i18nService.currentLang,
        );
    }

}
