import * as enGB from '@lima-i18n/en-GB.json';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login('admin@example.com', '123456')
        }
    )

    it('Should create a season', () => {
        cy.visit(`/`)
        cy.contains(enGB['NAVIGATION.ADMIN']).click();
        cy.contains(enGB['NAVIGATION.ADMIN.SEASONS']).click({ force: true });
        cy.contains(enGB['BUTTON.CREATE_SEASON']).click();
        cy.get('[data-cy="create-season-name"]').type('new-season');
        cy.get('[data-cy="create-season-button"]').click();
        cy.contains(enGB['CREATE_SEASON_SUCCESS']).should('exist');
    })
})
