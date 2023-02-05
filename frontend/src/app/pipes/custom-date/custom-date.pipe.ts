import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from 'src/app/services/i18n.service';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  constructor (
    private date: DatePipe,
    private i18nService: I18nService,
  ) {

  }

  transform(value: string | number | Date, format = 'shortDate'): string | null {
    return this.date.transform(value, format, undefined, this.i18nService.currentLang);
  }

}
