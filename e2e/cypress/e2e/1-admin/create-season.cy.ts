import * as enGB from '@lima-i18n/en-GB.json';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login('admin@example.com', '123456')
        }
    )

    it('Should create a season', () => {
        cy.visit(`/`)
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();
        cy.getBySel('button-create-season').click();
        cy.getBySel('input-create-season-name').type('new-season');
        cy.getBySel('button-create-season-submit').click();
        cy.contains(enGB['CREATE_SEASON_SUCCESS']).should('exist');
    })
})
