import { faker } from '@faker-js/faker';
import { type } from './type';
import { futureDate, time } from './date';

export function verifyEditMatchResult() {
    cy.getBySel('button-edit-match-result').first().click();
    type('input-home-score', faker.number.int({ min: 0, max: 99}).toString());
    type('input-guest-score', faker.number.int({ min: 0, max: 99}).toString());
    cy.getBySel('button-edit-match-result-submit').click();
    cy.successSnackbar();
}

export function verifyScheduleMatch() {
    cy.getBySel('button-schedule-match').first().click();
    type('input-time', time());
    type('input-kickoff-date', futureDate());
    cy.getBySel('button-schedule-match-submit').click();
    cy.successSnackbar();
}

export function verifySetPitch() {
    cy.getBySel('button-set-pitch').first().click();
    cy.get('mat-option').first().click();
    cy.getBySel('button-save-pitch').click();
    cy.successSnackbar();
}