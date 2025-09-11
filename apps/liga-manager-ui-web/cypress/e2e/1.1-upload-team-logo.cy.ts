import { Users } from '@cypress/fixtures';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
        },
    );

    it('Should upload team-logo', () => {
        cy.visit('/');
        cy.getBySel('route-teams-management').first().click();

        cy.getBySel('route-teams-management-logo').first().click();

        cy.getBySel('button-upload-team-logo').click();
    });

});
