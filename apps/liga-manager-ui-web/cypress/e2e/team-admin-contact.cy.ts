import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';

describe('Teamadmin - Teamcontact', () => {

    beforeEach(
        () => {
            cy.login(Users.teamAdmin.username, Users.teamAdmin.password);
        },
    );

    it('Should update a team contact', () => {

        cy.visit('/');
        cy.getBySel('route-teams-management').first().click();
        cy.getBySel('route-teams-management-contact').first().click();

        cy.getBySel('input-email').clear();
        cy.getBySel('input-email').type(faker.internet.email({ provider: 'example.com '}));
        cy.getBySel('input-first-name').clear();
        cy.getBySel('input-first-name').type(faker.person.firstName());
        cy.getBySel('input-last-name').clear();
        cy.getBySel('input-last-name').type(faker.person.lastName());
        cy.getBySel('input-phone').clear();
        cy.getBySel('input-phone').type(faker.phone.number());
        cy.getBySel('button-save').click();

        cy.successSnackbar();

    });

});
