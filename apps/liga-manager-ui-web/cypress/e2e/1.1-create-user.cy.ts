import { Users } from '@cypress/fixtures';

describe('Admin - Create User', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
        },
    );

    it('Should create a user', () => {
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-users').first().click();
        cy.getBySel('button-create-user').click();
        cy.getBySel('input-email').type('user@example.com');
        cy.getBySel('input-first-name').type('first');
        cy.getBySel('input-last-name').type('last');
        cy.getBySel('select-team').click();
        cy.get('mat-option').first().click();
        cy.getBySel('button-save-user').click({ force: true });
    });

});
