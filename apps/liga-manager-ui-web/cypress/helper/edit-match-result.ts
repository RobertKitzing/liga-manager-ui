import { faker } from '@faker-js/faker';
import { type } from './type';

export function editMatchResult() {
    cy.getBySel('button-edit-match-result').first().click();
    type('input-home-score', faker.number.int({ min: 0, max: 99}).toString());
    type('input-guest-score', faker.number.int({ min: 0, max: 99}).toString());
}