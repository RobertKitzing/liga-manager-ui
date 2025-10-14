import { CalendarOptions } from '../selected-items.state';

export class SetSelectedCalendarOptions {

    static readonly type = '[SelectedItemsState] SetSelectedCalendarOptions';

    constructor(
        public payload: Partial<CalendarOptions>,
    ) { }

}
