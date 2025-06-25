describe('Login', () => {

    it('Should Login and out', () => {
        cy.visit(`/`)
        cy.getBySel('button-login').click();
        cy.getBySel('input-username').type('admin@example.com');
        cy.getBySel('input-password').type('123456');
        cy.getBySel('button-login-submit').click();
        cy.getBySel('button-user-menu').click();
        cy.getBySel('button-logout').click();
        cy.getBySel('button-login').should('exist');
    });

})
