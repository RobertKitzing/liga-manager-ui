import { Teams, Users } from '@cypress/fixtures';

describe('Admin - Create Tournament', () => {

    const tournamentName = 'new-tournament';

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password)
        },
    )

    it('Should create a Tournament with 1. Round', () => {
        cy.visit('/')
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-tournaments').first().click();
        cy.getBySel('button-create-tournament').click();
        cy.getBySel('input-create-tournament-name').type(tournamentName);
        cy.getBySel('button-create-tournament-submit').click();
        cy.getBySel('snackbar-success-create-tournament').should('exist');
        cy.getBySel('select-tournament').click();
        cy.contains(tournamentName).click();
        cy.getBySel('input-team-auto-complete-home').first().type(Teams[0].name);
        cy.get('mat-option').contains(Teams[0].name).click();
        cy.getBySel('input-team-auto-complete-guest').first().type(Teams[1].name);
        cy.get('mat-option').contains(Teams[1].name).click();
        cy.getBySel('button-add-match-to-tournament-round').click();
        cy.getBySel('input-team-auto-complete-home').first().type(Teams[2].name);
        cy.get('mat-option').contains(Teams[2].name).click();
        cy.getBySel('input-team-auto-complete-guest').first().type(Teams[3].name);
        cy.get('mat-option').contains(Teams[3].name).click();
        cy.getBySel('button-add-match-to-tournament-round').click();

        cy.getBySel('button-save-tournament-round').click();

        cy.getBySel('button-start-tournament').click();

    })

})
