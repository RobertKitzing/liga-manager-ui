import * as enGB from '@lima-i18n/en-GB.json';
import { Users } from 'cypress/support/values';
import { Seasons } from 'cypress/support/values/seasons';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
            cy.visit(`/`)
            cy.getBySel('route-admin').first().click();
            cy.getBySel('route-admin-seasons').first().click();
        }
    )

    it('Should create a season', () => {
        cy.getBySel('button-create-season').click();
        cy.getBySel('input-create-season-name').type(Seasons[0].name);
        cy.getBySel('button-create-season-submit').click();
        cy.contains(enGB['CREATE_SEASON_SUCCESS']).should('exist');
    })

    it('should select-season a season', () => {
        cy.getBySel('select-season').click();
        cy.contains(Seasons[0].name).click();
        cy.getBySel('button-add-team-to-season').click({ multiple: true });
    })
})
