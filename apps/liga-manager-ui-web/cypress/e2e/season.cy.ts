import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

describe('Admin - Season', () => {

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
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

            cy.getBySel('input-team-auto-complete').clear();
            cy.getBySel('input-team-auto-complete').type(Users.teamAdmin.team);
            cy.contains(Users.teamAdmin.team).click();

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

    it('should edit an Match', () => {
        cy.visit('/');
        cy.getBySel('route-schedule').first().click();
        cy.getBySel('select-season').click();
        cy.get('mat-option').first().click();

        cy.getBySel('button-edit-match-result').first().click();
        cy.getBySel('input-home-score').clear({ force: true });
        cy.getBySel('input-home-score').type('10', { force: true });
        cy.getBySel('input-guest-score').clear({ force: true });
        cy.getBySel('input-guest-score').type('1', { force: true });
        cy.getBySel('button-edit-match-result-submit').click();
        cy.getBySel('match-home-score').should('contain', 10);
        cy.getBySel('match-guest-score').should('contain', 1);

        cy.getBySel('button-schedule-match').first().click();
        cy.getBySel('input-time').clear({ force: true });
        cy.getBySel('input-time').type('09:00');
        cy.getBySel('input-kickoff-date').clear({ force: true });
        cy.getBySel('input-kickoff-date').type(format(faker.date.future(), 'P'), { force: true });
        cy.getBySel('button-schedule-match-submit').click();

        // cy.getBySel('button-set-pitch').first().click();
        // cy.get('mat-option').first().click();
        // cy.getBySel('button-save-pitch').click();

    });

});
