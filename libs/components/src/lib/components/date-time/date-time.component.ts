import { Component, input } from '@angular/core';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { AppSettingsSelectors } from '@liga-manager-ui/states';
import { select } from '@ngxs/store';
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

    localTimeZone = select(AppSettingsSelectors.localTimeZone);

    date = input<string | undefined>();

    isTimeZoneDifferent(date: string | undefined) {
        const givenDate = parseISO(date!);
        const localTime = toZonedTime(givenDate, this.localTimeZone());
        return this.localTimeZone() !== this.currentTimeZone ? localTime : undefined;
    }

}
