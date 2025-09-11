import { Users } from '@cypress/fixtures';

describe('Admin - Edit Match Result', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
        },
    );

    it('should edit an Match result by click in result area', () => {
        cy.visit('/');
        cy.getBySel('route-schedule').first().click();
        // cy.getBySel('select-season').click();
        // cy.contains(Seasons[0].name).click();
        // cy.getBySel('button-edit-match-result').first().click();
        // cy.getBySel('input-home-score').clear()
        // cy.getBySel('input-home-score').type('10', { force: true });
        // cy.getBySel('input-guest-score').clear()
        // cy.getBySel('input-guest-score').type('1', { force: true });
        // cy.getBySel('button-edit-match-result-submit').click();
    });

});

