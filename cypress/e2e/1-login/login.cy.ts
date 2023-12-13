import enGB from '@lima-i18n/en-GB.json';

describe('Login', () => {
    it('Should Login', () => {
        cy.visit(`/`)
        cy.contains(enGB['BUTTON.LOGIN']).click();
        cy.get('[data-cy="username"]').type('admin@admin');
        cy.get('[data-cy="password"]').type('admin123');
        cy.get('[data-cy="login-button"]').click();
    })
})
