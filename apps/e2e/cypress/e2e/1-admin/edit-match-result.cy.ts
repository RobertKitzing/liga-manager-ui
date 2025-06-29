import { Users } from "cypress/support/values"

describe('Admin - Edit Match Result', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password)
        }
    )

    it('should edit an Match result by click in result area', () => {
        cy.visit(`/`)
        cy.getBySel('route-schedule').first().click();
        cy.getBySel('select-season').click().get('mat-option').first().click();
        cy.getBySel('button-edit-match-result').first().click();
        cy.getBySel('input-home-score').clear().type("10", { force: true });
        cy.getBySel('input-guest-score').clear().type("1", { force: true });
        cy.getBySel('button-edit-match-result-submit').click();
    })

})

