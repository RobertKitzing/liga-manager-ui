import { formatISO, parseISO } from 'date-fns';

export class ApiDate {

    date: Date;

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
        return formatISO(this.date, { representation: 'date' });
    }

}
