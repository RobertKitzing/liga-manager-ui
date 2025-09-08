import { format } from 'date-fns';

export class ApiDate {

    private date: Date;

    constructor(
        date: Date | string,
    ) {
        this.date = new Date(date);
    }

    toJSON(): string {
        return format(this.date, 'yyyy-LL-dd');
    }

}
