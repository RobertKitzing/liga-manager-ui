import { format, parseISO } from 'date-fns';

export class ApiDate {

    private date: Date;

    constructor(
        date: Date | string,
    ) {
        if (typeof date === 'string') {
            this.date = parseISO(date);
        } else {
            this.date = date;
        }
    }

    toJSON(): string {
        return format(this.date, 'yyyy-LL-dd');
    }

}
