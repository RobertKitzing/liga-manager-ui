import { Users, Seasons } from '@cypress/fixtures';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
            cy.visit('/')
            cy.getBySel('route-admin').first().click();
            cy.getBySel('route-admin-seasons').first().click();
        },
    )

    it('Should create a season', () => {
        cy.getBySel('button-create-season').click();
        cy.getBySel('input-create-season-name').type(Seasons[0].name);
        cy.getBySel('button-create-season-submit').click();
        cy.getBySel('snackbar-success-create-season').should('exist');
    })

    it('should select-season a season', () => {
        cy.getBySel('select-season').click();
        cy.contains(Seasons[0].name).click();
        cy.getBySel('button-add-team-to-season').click({ multiple: true });
    })
})
