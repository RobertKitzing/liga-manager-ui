import { faker } from '@faker-js/faker';

import { ApiDate } from '../gen/api-date';

export function apiDateGenerator() {
    return new ApiDate(faker.date.anytime());
}

export function apiDateTimeGenerator() {
    return faker.date.anytime().toJSON();
}

export function dateStringGenerator() {
    return faker.date.anytime().toJSON();
}

export function fakeEmail() {
    return faker.internet.email({ provider: 'example.com'});
}
