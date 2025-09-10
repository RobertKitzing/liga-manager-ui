import { FormControl } from '@angular/forms';
import { UTCDate } from '@date-fns/utc';

export class ApiDateFormControl extends FormControl {

    override readonly value!: UTCDate;

    override setValue(
        value: UTCDate,
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
            emitModelToViewChange?: boolean;
            emitViewToModelChange?: boolean;
        },
    ): void {
        super.setValue(new UTCDate(
            value.getFullYear(),
            value.getMonth(),
            value.getDate(),
        ), options);
    }

}
