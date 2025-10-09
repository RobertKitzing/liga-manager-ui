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

    it('Should update a team contact', () => {

        cy.visit('/');
        cy.getBySel('route-teams-management').first().click();
        cy.getBySel('route-teams-management-contact').first().click();

        cy.getBySel('input-team-auto-complete').clear();
        cy.getBySel('input-team-auto-complete').type(team);

        cy.getBySel('input-email').clear();
        cy.getBySel('input-email').type(faker.internet.email({ provider: 'example.com '}));
        cy.getBySel('input-first-name').clear();
        cy.getBySel('input-first-name').type(faker.person.firstName());
        cy.getBySel('input-last-name').clear();
        cy.getBySel('input-last-name').type(faker.person.lastName());
        cy.getBySel('input-phone').clear();
        cy.getBySel('input-phone').type(faker.phone.number());
        cy.getBySel('button-save').click();

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
