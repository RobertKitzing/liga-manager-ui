import { Teams, Tournaments, Users } from '@cypress/fixtures';

describe('Admin - Create Tournament', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
        },
    );

    it('Should create a Tournament', () => {
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-tournaments').first().click();

        cy.getBySel('button-create-tournament').click();
        cy.getBySel('input-create-tournament-name').type(Tournaments[0].name);

        cy.intercept('POST', '/api/graphql').as('graphql');

        cy.getBySel('button-create-tournament-submit').click();
        cy.getBySel('snackbar-success-create-tournament').should('exist');

        cy.wait(['@graphql', '@graphql']);


        cy.getBySel('select-tournament').click();
        cy.get('mat-option').contains(Tournaments[0].name).click();

        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.getBySel('input-tournament-round-from-date').type('07/21/2025', { force: true });

        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.getBySel('input-tournament-round-to-date').type('07/22/2025', { force: true });

        cy.getBySel('input-team-auto-complete-home').first().type(Teams[0].name);
        cy.get('mat-option').contains(Teams[0].name).click();
        cy.getBySel('input-team-auto-complete-guest').first().type(Teams[1].name);
        cy.get('mat-option').contains(Teams[1].name).click();
        cy.getBySel('button-add-match-to-tournament-round').click();
        cy.getBySel('input-team-auto-complete-home').first().type(Teams[2].name);
        cy.get('mat-option').contains(Teams[2].name).click();
        cy.getBySel('input-team-auto-complete-guest').first().type(Teams[3].name);
        cy.get('mat-option').contains(Teams[3].name).click();
        cy.getBySel('button-add-match-to-tournament-round').click();

        cy.getBySel('button-save-tournament-round').click();

        cy.getBySel('button-start-tournament').click();

        cy.getBySel('button-create-next-tournament-round').click();

        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.getBySel('input-tournament-round-from-date').type('07/21/2025', { force: true });

        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.getBySel('input-tournament-round-to-date').type('07/22/2025', { force: true });

        cy.getBySel('input-team-auto-complete-home').first().type(Teams[0].name);
        cy.get('mat-option').contains(Teams[0].name).click();
        cy.getBySel('input-team-auto-complete-guest').first().type(Teams[1].name);
        cy.get('mat-option').contains(Teams[1].name).click();
        cy.getBySel('button-add-match-to-tournament-round').click();

        cy.getBySel('button-save-tournament-round').click();

    });

});
