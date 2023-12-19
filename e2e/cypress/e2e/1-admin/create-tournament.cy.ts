import * as enGB from '@lima-i18n/en-GB.json';

describe('Admin - Create Tournament', () => {

    beforeEach(
        () => {
            cy.login('admin@example.com', '123456')
        }
    )

    it('Should create a Tournament', () => {
        cy.visit(`/`)
        cy.contains(enGB['NAVIGATION.ADMIN']).click();
        cy.contains(enGB['NAVIGATION.ADMIN.TOURNAMENTS']).click({ force: true });
        cy.contains(enGB['BUTTON.CREATE_TOURNAMENT']).click();
        cy.get('[data-cy="create-tournament-name"]').type('new-tournament');
        cy.get('[data-cy="create-tournament-button"]').click();
        cy.contains(enGB['CREATE_TOURNAMENT_SUCCESS']).should('exist');
    })
})
