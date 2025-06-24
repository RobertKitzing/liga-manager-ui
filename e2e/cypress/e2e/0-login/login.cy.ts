describe('Login', () => {

    it('Should Login and out', () => {
        cy.visit(`/`)
        cy.get('[data-cy="login"]').click();
        cy.get('[data-cy="username"]').type('admin@example.com');
        cy.get('[data-cy="password"]').type('123456');
        cy.get('[data-cy="submit-login"]').click();
        cy.get('[data-cy="user-menu"]').click();
        cy.get('[data-cy="logout"]').click();
        cy.get('[data-cy="login"]').should('exist');
    });

})
