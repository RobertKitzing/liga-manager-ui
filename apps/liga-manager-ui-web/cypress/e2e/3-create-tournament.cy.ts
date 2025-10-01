import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';

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

        for (let i = 0; i<3;i++) {
            const name = faker.science.chemicalElement().name;
            cy.getBySel('button-create-tournament').click();
            cy.getBySel('input-create-tournament-name').type(name);

            cy.intercept('POST', '/api/graphql').as('graphql');

            cy.getBySel('button-create-tournament-submit').click();
            cy.getBySel('snackbar-success-create-tournament').should('exist');

            cy.wait(['@graphql', '@graphql']);

            cy.getBySel('select-tournament').click();
            cy.get('mat-option').contains(name).click();

            cy.getBySel('input-tournament-round-from-date').type('07/21/2025', { force: true });

            cy.getBySel('input-tournament-round-to-date').type('07/22/2025', { force: true });

            cy.getBySel('input-team-auto-complete-home').first().type(Users.teamAdmin.team);
            cy.get('mat-option').contains(Users.teamAdmin.team).click();
            cy.getBySel('input-team-auto-complete-guest').first().click();
            cy.getBySel('team-0').click();
            cy.getBySel('button-add-match-to-tournament-round').click();

            cy.getBySel('button-save-tournament-round').click();

            cy.getBySel('button-create-next-tournament-round').click();

            cy.getBySel('input-tournament-round-from-date').type('07/21/2025', { force: true });

            cy.getBySel('input-tournament-round-to-date').type('07/22/2025', { force: true });

            cy.getBySel('input-team-auto-complete-home').first().click();
            cy.getBySel('team-1').click();
            cy.getBySel('input-team-auto-complete-guest').first().click();
            cy.getBySel('team-2').click();
            cy.getBySel('button-add-match-to-tournament-round').click();

            cy.getBySel('button-save-tournament-round').click();

            cy.getBySel('button-start-tournament').click();

            if (i % 2 === 0) {
                cy.getBySel('button-end-tournament').click();
                cy.getBySel('button-confirm-yes').click();
            }

        }
    });

});
