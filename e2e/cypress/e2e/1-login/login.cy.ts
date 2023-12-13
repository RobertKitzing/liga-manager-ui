import * as enGB from '@lima-i18n/en-GB.json';

describe('Login', () => {
    it('Should Login', () => {
        cy.visit(`/`)
        cy.contains(enGB['BUTTON.LOGIN']).click();
        cy.get('[data-cy="username"]').type('admin@example.com');
        cy.get('[data-cy="password"]').type('123456');
        cy.get('[data-cy="login-button"]').click();
        cy.contains('admin admin').should('exist')
    })
})
