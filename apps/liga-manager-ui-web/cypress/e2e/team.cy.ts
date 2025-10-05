import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';

describe('Admin - Team', () => {

    let team: string;

    before(
        () => {
            team = faker.company.name();
        },
    );

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
        },
    );

    it('Should create team', () => {

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-teams').first().click();

        cy.getBySel('button-create-team').click();
        cy.getBySel('input-create-team-name').clear();
        cy.getBySel('input-create-team-name').type(team);
        cy.getBySel('button-create-team-submit').click();
        cy.successSnackbar();

    });

    it('Should rename a team', () => {

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-teams').first().click();

        cy.getBySel('input-team-search').clear();
        cy.getBySel('input-team-search').type(team);
        cy.getBySel('button-edit-team').first().click();
        team = faker.company.name();
        cy.getBySel('input-new-team-name').clear();
        cy.getBySel('input-new-team-name').type(team);
        cy.getBySel('button-rename-team').click();
        cy.successSnackbar();

    });

    it('Should delete a team', () => {

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-teams').first().click();

        cy.getBySel('input-team-search').clear();
        cy.getBySel('input-team-search').type(team);
        cy.getBySel('button-delete-team').click();
        cy.getBySel('button-confirm-yes').click();
        cy.successSnackbar();

    });

});
