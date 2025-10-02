import { Users } from '@cypress/fixtures';

describe('Team Admin Login', () => {

    it('Should Login and out', () => {
        cy.visit('/');
        cy.getBySel('button-login').click();
        cy.getBySel('input-username').type(Users.teamAdmin.username);
        cy.getBySel('input-password').type(Users.teamAdmin.password);
        cy.getBySel('button-login-submit').click();
        cy.getBySel('button-user-menu').click();
        cy.getBySel('button-logout').click();
        cy.getBySel('button-login').should('exist');
    });

});
