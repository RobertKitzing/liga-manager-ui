import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

describe('Admin - Create Season', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
            cy.createTeams();
        },
    );

    it('Should create a season', () => {
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        for (let i = 0; i < 3 ;i++) {
            const name = faker.person.lastName();

            cy.getBySel('button-create-season').click();
            cy.getBySel('input-create-season-name').type(name);
            cy.getBySel('button-create-season-submit').click();
            cy.getBySel('snackbar-success-create-season').should('exist');
            cy.getBySel('select-season').click();
            cy.contains(name).click();
            cy.getBySel('season-management-tab-select-teams').click();

            for (let i = 0 ; i < 10; i++) {
                cy.getBySel('input-team-auto-complete').clear();
                cy.getBySel('input-team-auto-complete').click();
                cy.get('mat-option').first().click();
            }

            cy.getBySel('season-management-tab-create-matchdays').click();

            cy.getBySel('input-tournament-season-start-date').clear({ force: true });
            cy.getBySel('input-tournament-season-start-date').type(format(faker.date.future(), 'P'), { force: true });

            cy.getBySel('button-save-match-days').click();

            cy.getBySel('button-start-season').click();

            if (i % 2 === 0) {
                cy.getBySel('button-end-season').click();
                cy.getBySel('button-confirm-yes').click();
            }
        }
    });

});
