import { Component, inject, input } from '@angular/core';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { AppsettingsService } from '@liga-manager-ui/services';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Component({
    selector: 'lima-date-time',
    templateUrl: './date-time.component.html',
    standalone: true,
    imports: [
        CustomDatePipe,
    ],
})
export class DateTimeComponent {

    currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    appSettings = inject(AppsettingsService);

    date = input<string | undefined>();

    isTimeZoneDifferent(date: string | undefined) {
        const givenDate = parseISO(date!);
        const localTime = toZonedTime(givenDate, this.appSettings.localTimeZone);
        return this.appSettings.localTimeZone !== this.currentTimeZone ? localTime : undefined;
    }

}
