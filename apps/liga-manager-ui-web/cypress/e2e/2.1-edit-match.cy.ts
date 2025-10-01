import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

describe('Admin - Edit Match Result', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
            cy.visit('/');
            cy.getBySel('route-schedule').first().click();
            cy.getBySel('select-season').click();
            cy.get('mat-option').first().click();
        },
    );

    it('should edit an Match result', () => {
        cy.getBySel('button-edit-match-result').first().click();
        cy.getBySel('input-home-score').clear();
        cy.getBySel('input-home-score').type('10', { force: true });
        cy.getBySel('input-guest-score').clear();
        cy.getBySel('input-guest-score').type('1', { force: true });
        cy.getBySel('button-edit-match-result-submit').click();
        cy.getBySel('match-home-score').should('contain', 10);
        cy.getBySel('match-guest-score').should('contain', 1);
    });

    it('should schedule an Match', () => {
        cy.getBySel('button-schedule-match').first().click();
        cy.getBySel('input-time').clear();
        cy.getBySel('input-time').type('09:00');
        cy.getBySel('input-kickoff-date').clear();
        cy.getBySel('input-kickoff-date').type(format(faker.date.future(), 'P'), { force: true });
        cy.getBySel('button-schedule-match-submit').click();
    });

    it('should set an existing Pitch', () => {
        cy.getBySel('button-set-pitch').first().click();
        cy.get('mat-option').first().click();
        cy.getBySel('button-save-pitch').click();
    });

});

