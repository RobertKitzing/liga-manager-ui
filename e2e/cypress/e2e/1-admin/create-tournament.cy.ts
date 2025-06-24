import * as enGB from '@lima-i18n/en-GB.json';

describe('Admin - Create Tournament', () => {

    beforeEach(
        () => {
            cy.login('admin@example.com', '123456')
        }
    )

    it('Should create a Tournament', () => {
        cy.visit(`/`)
        cy.get('[data-cy="route-admin"]').first().click();
        cy.get('[data-cy="route-admin-tournaments"]').first().click();
        cy.get('[data-cy="create-tournament-button"]').click();
        cy.get('[data-cy="create-tournament-name"]').type('new-tournament');
        cy.get('[data-cy="create-tournament-submit-button"]').click();
        cy.contains(enGB['CREATE_TOURNAMENT_SUCCESS']).should('exist');
    })
})
