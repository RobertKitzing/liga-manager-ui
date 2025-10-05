import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import * as locales from 'date-fns/locale';

function formatDate(date: Date, formatString = 'P', locale: keyof typeof locales = Cypress.env('CYPRESS_LANG')) {
    return format(date, formatString, { locale: locales[locale] });
}

export function time() {
    return formatDate(faker.date.anytime(), 'p');
}

export function futureDate() {
    return formatDate(faker.date.soon());
}

export function futureDateSpan() {

    const start = faker.date.soon();
    const end = faker.date.soon({ refDate: start });
    return {
        from: formatDate(start),
        to: formatDate(end),
    };

}

