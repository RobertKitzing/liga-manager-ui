import { APP_ROUTES } from '@lima/app.routes.enum'

describe('Login', () => {
    it('Should Login', () => {
        cy.visit(`/`)
        cy.get('#login').click();
        cy.get('#username').type('admin@admin');
        cy.get('#password').type('admin123');
        cy.get('#execute-login').click();
    })
})
