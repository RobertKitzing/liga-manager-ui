import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
        },
    );

    it('Should create teams', () => {
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.intercept('POST', '/api/graphql').as('graphql');
        cy.getBySel('route-admin-teams').first().click();
        cy.wait(['@graphql']);

        const teams = Array.from({ length: 10 }, () => ({ name: faker.person.firstName() }) );
        for (const team of teams) {
            cy.getBySel('button-create-team').click();
            cy.getBySel('input-create-team-name').clear();
            cy.getBySel('input-create-team-name').type(team.name);
            cy.getBySel('button-create-team-submit').click();
            cy.getBySel('snackbar-success').should('exist');
        }
    });

});
