import * as enGB from '@lima-i18n/en-GB.json';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login('admin@example.com', '123456')
        }
    )

    it('Should create a season', () => {
        cy.visit(`/`)
        cy.get('[data-cy="route-admin"]').first().click();
        cy.get('[data-cy="route-admin-seasons"]').first().click();
        cy.get('[data-cy="create-season-button"]').click();
        cy.get('[data-cy="create-season-name"]').type('new-season');
        cy.get('[data-cy="create-season-submit-button"]').click();
        cy.contains(enGB['CREATE_SEASON_SUCCESS']).should('exist');
    })
})
