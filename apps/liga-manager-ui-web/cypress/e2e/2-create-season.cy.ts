import { Users, Seasons, Teams } from '@cypress/fixtures';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
        },
    )

    it('Should create a season', () => {
        cy.visit('/')
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        cy.getBySel('button-create-season').click();
        cy.getBySel('input-create-season-name').type(Seasons[0].name);
        cy.getBySel('button-create-season-submit').click();
        cy.intercept('POST', '/api/graphql').as('graphql');

        cy.getBySel('snackbar-success-create-season').should('exist');

        cy.wait(['@graphql', '@graphql'])
        
        cy.getBySel('select-season').click();
        cy.contains(Seasons[0].name).click();
        cy.getBySel('season-management-tab-select-teams').click();

        for (const team of Teams) {
            // eslint-disable-next-line cypress/unsafe-to-chain-command
            cy.getBySel('input-team-auto-complete').clear().type(team.name)
            cy.get('mat-option').contains(team.name).click()
        }

        cy.getBySel('season-management-tab-create-matchdays').click();

        cy.getBySel('input-tournament-season-start-date').type('07/21/2025');

        cy.getBySel('button-save-match-days').click();

        cy.getBySel('button-start-season').click();
    })

})
