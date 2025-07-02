import { Teams, Users } from '@cypress/fixtures';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password)
        },
    )

    it('Should create teams', () => {
        cy.visit('/')
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-teams').first().click();
        for (const team of Teams) {
            cy.getBySel('button-create-team').click();
            cy.getBySel('input-create-team-name').clear();
            cy.getBySel('input-create-team-name').type(team.name);
            cy.getBySel('button-create-team-submit').click();
            cy.getBySel('button-create-team-submit').should('not.exist');
        }
    })

})
