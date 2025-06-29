import * as enGB from '@lima-i18n/en-GB.json';
import { Users } from 'cypress/support/values';

describe('Admin - Create Tournament', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password)
        }
    )

    it('Should create a Tournament', () => {
        cy.visit(`/`)
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-tournaments').first().click();
        cy.getBySel('button-create-tournament').click();
        cy.getBySel('input-create-tournament-name').type('new-tournament');
        cy.getBySel('button-create-tournament-submit').click();
        cy.contains(enGB['CREATE_TOURNAMENT_SUCCESS']).should('exist');
    })
})
