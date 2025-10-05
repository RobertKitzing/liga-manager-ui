import { Users } from '@cypress/fixtures';

describe('Admin - Upload Team Logo', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
            cy.visit('/');
            cy.getBySel('route-teams-management').first().click();
            cy.getBySel('route-teams-management-logo').first().click();
        },
    );

    it('Should upload team-logo', () => {

        cy.get('input[type=file]').selectFile('gondischwein.png', { force: true });

        cy.getBySel('button-save-team-logo').click();

        cy.successSnackbar();

    });

    it('should has the logo', ()=> {
        cy.get('.team-logo').should('exist');
    });

});
