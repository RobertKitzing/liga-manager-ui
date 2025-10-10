import { Users } from '@cypress/fixtures';
import { futureDate, verifyEditMatchResult, verifyScheduleMatch, verifySetPitch } from '@cypress/helper';
import { faker } from '@faker-js/faker';

describe('Season', () => {

    let names: string[];

    before(
        () => {
            names = faker.helpers.uniqueArray(faker.person.lastName, 2);
        },
    );

    it('Should create Seasons', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        names.forEach(
            (name) => {
                cy.getBySel('button-create-season').click();
                cy.getBySel('input-create-season-name').type(name);
                cy.getBySel('button-create-season-submit').click();
                cy.successSnackbar();
            },
        );
    });

    it('Should add teams to seasons', () => {
        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        names.forEach(
            (name) => {
                cy.getBySel('select-season').click();
                cy.get('mat-option').contains(name).click();

                cy.getBySel('season-management-tab-select-teams').click();
                cy.getBySel('input-team-auto-complete').clear();
                cy.getBySel('input-team-auto-complete').type(Users.teamAdmin.team);
                cy.contains(Users.teamAdmin.team).click();
                cy.successSnackbar();

                for (let i = 0 ; i < 5; i++) {
                    cy.getBySel('input-team-auto-complete').clear();
                    cy.getBySel('input-team-auto-complete').click();
                    cy.get('mat-option').first().click();
                    cy.successSnackbar();
                }
            },
        );
    });

    it('Should remove a team from a season', () => {
        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        cy.getBySel('select-season').click();
        cy.get('mat-option').contains(names[1]).click();

        cy.getBySel('button-remove-team-from-season').first().click();
        cy.successSnackbar();

    });

    it('Should create matchdays seasons', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        names.forEach(
            (name) => {
                cy.getBySel('select-season').click();
                cy.get('mat-option').contains(name).click();

                cy.getBySel('season-management-tab-create-matchdays').click();

                cy.getBySel('input-tournament-season-start-date').clear({ force: true });
                cy.getBySel('input-tournament-season-start-date').type(futureDate(), { force: true });

                cy.getBySel('button-save-match-days').click();
                cy.successSnackbar();
            },
        );
    });

    it('Should start all seasons', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        names.forEach(
            (name) => {
                cy.getBySel('select-season').click();
                cy.get('mat-option').contains(name).click();
                cy.getBySel('button-start-season').click();
                cy.successSnackbar();
            },
        );

    });

    it('Should add a penalty', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        names.forEach(
            (name) => {
                cy.getBySel('select-season').click();
                cy.get('mat-option').contains(name).click();
                cy.getBySel('season-management-tab-penalties').first().click();
                cy.getBySel('button-create-penalty').click();

                cy.getBySel('input-team-auto-complete').clear();
                cy.getBySel('input-team-auto-complete').click();
                cy.get('mat-option').first().click();

                cy.getBySel('input-penalty-points').clear();
                cy.getBySel('input-penalty-points').type('3');

                cy.getBySel('input-penalty-reason').clear();
                cy.getBySel('input-penalty-reason').type(faker.word.words(10));

                cy.getBySel('button-save').click();
                cy.successSnackbar();

                cy.getBySel('button-delete-penalty').click();
                cy.getBySel('button-confirm-yes').click();
                cy.successSnackbar();
            },
        );

    });

    it('Should end a Season', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-seasons').first().click();

        cy.getBySel('select-season').click();
        cy.get('mat-option').contains(names[1]).click();

        cy.getBySel('button-end-season').click();
        cy.getBySel('button-confirm-yes').click();
        cy.successSnackbar();
    });

    it('should edit an Match as a admin', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-schedule').first().click();
        cy.getBySel('select-season').click();
        cy.get('mat-option').contains(names[0]).click();

        verifyEditMatchResult();

        verifyScheduleMatch();

        verifySetPitch();

    });

    it('should edit an Match as a team-admin', () => {

        cy.login(Users.teamAdmin.username, Users.teamAdmin.password);

        cy.visit('/');
        cy.getBySel('route-schedule').first().click();
        cy.getBySel('select-season').click();
        cy.get('mat-option').contains(names[0]).click();

        verifyEditMatchResult();

        verifyScheduleMatch();

        verifySetPitch();

    });

    it('Should go to Table', () => {
        cy.visit('/');
        cy.getBySel('route-table').first().click();
        cy.getBySel('select-season').click();
        cy.getBySel('select-season');
        cy.get('mat-option').contains(names[0]).click();
        cy.get('lima-table').should('exist');
    });

    it('Should go to Schedule', () => {
        cy.visit('/');
        cy.getBySel('route-schedule').first().click();
        cy.getBySel('select-season').click();
        cy.getBySel('select-season');
        cy.get('mat-option').contains(names[0]).click();
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
        cy.get('mat-option').contains(names[1]).click();

        cy.get('lima-table').should('exist');
    });

    it('Should go to History Schedule', () => {
        cy.visit('/');
        cy.getBySel('route-history').first().click();
        cy.getBySel('route-history-schedule').first().click();

        cy.getBySel('select-season').click();
        cy.getBySel('select-season');
        cy.get('mat-option').contains(names[1]).click();
        cy.get('lima-schedule').should('exist');

        cy.getBySel('cant-edit-match-result').should('exist');
        cy.getBySel('cant-schedule-match').should('exist');
        cy.getBySel('cant-set-pitch').should('exist');

    });

});
