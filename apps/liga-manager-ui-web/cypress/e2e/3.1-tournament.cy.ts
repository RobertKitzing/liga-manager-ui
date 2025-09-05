import { Tournaments, Users } from '@cypress/fixtures';

describe('Public - Select Tournament', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
        },
    );

    it('Should select a Tournament', () => {

        cy.visit('/');
        cy.getBySel('route-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').contains(Tournaments[0].name).click();

        cy.get('lima-match').should('have.length', 2);

        cy.getBySel('button-next-matchday').click();

        cy.get('lima-match').should('have.length', 1);

        cy.getBySel('button-prev-matchday').click();

        cy.get('lima-match').should('have.length', 2);

        cy.getBySel('button-edit-match-result').first().click();
        cy.getBySel('input-home-score').clear();
        cy.getBySel('input-home-score').type('10', { force: true });
        cy.getBySel('input-guest-score').clear();
        cy.getBySel('input-guest-score').type('1', { force: true });
        cy.getBySel('button-edit-match-result-submit').click();

        cy.getBySel('button-schedule-match').first().click();

        cy.getBySel('input-time').clear();
        cy.getBySel('input-time').type('09:00');

        cy.getBySel('input-kickoff-date').type('07/21/2025', { force: true });

        cy.getBySel('button-schedule-match-submit').click();
    });

});