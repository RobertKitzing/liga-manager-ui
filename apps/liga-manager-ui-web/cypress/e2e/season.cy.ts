import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

describe('Admin - Season', () => {

    it('Should create a season', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        for (let i = 0; i < 3 ;i++) {
            const name = faker.person.lastName();

            cy.getBySel('button-create-season').click();
            cy.getBySel('input-create-season-name').type(name);
            cy.getBySel('button-create-season-submit').click();
            cy.getBySel('snackbar-success').should('exist');

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

    it('should edit an Match as a admin', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-schedule').first().click();
        cy.getBySel('select-season').click();
        cy.get('mat-option').first().click();

        cy.getBySel('button-edit-match-result').first().click();
        cy.getBySel('input-home-score').clear({ force: true });
        cy.getBySel('input-home-score').type(faker.number.int({ min: 0, max: 99}).toString(), { force: true });
        cy.getBySel('input-guest-score').clear({ force: true });
        cy.getBySel('input-guest-score').type(faker.number.int({ min: 0, max: 99}).toString(), { force: true });
        cy.getBySel('button-edit-match-result-submit').click();
        cy.getBySel('snackbar-success').should('exist');

        cy.getBySel('button-schedule-match').first().click();
        cy.getBySel('input-time').clear({ force: true });
        cy.getBySel('input-time').type('09:00');
        cy.getBySel('input-kickoff-date').clear({ force: true });
        cy.getBySel('input-kickoff-date').type(format(faker.date.future(), 'P'), { force: true });
        cy.getBySel('button-schedule-match-submit').click();
        cy.getBySel('snackbar-success').should('exist');

        cy.getBySel('button-set-pitch').first().click();
        cy.get('mat-option').first().click();
        cy.getBySel('button-save-pitch').click();
        cy.getBySel('snackbar-success').should('exist');

    });

    it('should edit an Match as a team-admin', () => {

        cy.login(Users.teamAdmin.username, Users.teamAdmin.password);

        cy.visit('/');
        cy.getBySel('route-schedule').first().click();
        cy.getBySel('select-season').click();
        cy.get('mat-option').first().click();

        cy.getBySel('button-edit-match-result').first().click();
        cy.getBySel('input-home-score').clear({ force: true });
        cy.getBySel('input-home-score').type(faker.number.int({ min: 0, max: 99}).toString(), { force: true });
        cy.getBySel('input-guest-score').clear({ force: true });
        cy.getBySel('input-guest-score').type(faker.number.int({ min: 0, max: 99}).toString(), { force: true });
        cy.getBySel('button-edit-match-result-submit').click();
        cy.getBySel('snackbar-success').should('exist');

        cy.getBySel('button-schedule-match').first().click();
        cy.getBySel('input-time').clear({ force: true });
        cy.getBySel('input-time').type('09:00');
        cy.getBySel('input-kickoff-date').clear({ force: true });
        cy.getBySel('input-kickoff-date').type(format(faker.date.future(), 'P'), { force: true });
        cy.getBySel('button-schedule-match-submit').click();
        cy.getBySel('snackbar-success').should('exist');

        cy.getBySel('button-set-pitch').first().click();
        cy.get('mat-option').first().click();
        cy.getBySel('button-save-pitch').click();
        cy.getBySel('snackbar-success').should('exist');

    });

    it('Should go to Table', () => {
        cy.visit('/');
        cy.getBySel('route-table').first().click();
        cy.getBySel('select-season').click();
        cy.getBySel('select-season');
        cy.get('mat-option').first().click();
        cy.get('lima-table').should('exist');
    });

    it('Should go to Schedule', () => {
        cy.visit('/');
        cy.getBySel('route-schedule').first().click();
        cy.getBySel('select-season').click();
        cy.getBySel('select-season');
        cy.get('mat-option').first().click();
        cy.get('lima-schedule').should('exist');

        cy.getBySel('cant-edit-match-result').should('exist');
        cy.getBySel('cant-schedule-match').should('exist');
        cy.getBySel('cant-set-pitch').should('exist');

    });

    it('Should go to History Table', () => {
        cy.visit('/');
        cy.getBySel('route-history').first().click();
        cy.getBySel('route-history-table').first().click();

        cy.getBySel('select-season').click();
        cy.getBySel('select-season');
        cy.get('mat-option').first().click();

        cy.get('lima-table').should('exist');
    });

    it('Should go to History Schedule', () => {
        cy.visit('/');
        cy.getBySel('route-history').first().click();
        cy.getBySel('route-history-schedule').first().click();

        cy.getBySel('select-season').click();
        cy.getBySel('select-season');
        cy.get('mat-option').first().click();
        cy.get('lima-schedule').should('exist');

        cy.getBySel('cant-edit-match-result').should('exist');
        cy.getBySel('cant-schedule-match').should('exist');
        cy.getBySel('cant-set-pitch').should('exist');

    });

});
