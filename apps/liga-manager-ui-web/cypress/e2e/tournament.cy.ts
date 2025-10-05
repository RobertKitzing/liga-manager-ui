import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';

describe('Admin - Tournament', () => {

    it('Should create a Tournament', () => {

        cy.login(Users.admin.username, Users.admin.password);
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-tournaments').first().click();

        for (let i = 0; i<3;i++) {
            const name = faker.person.lastName();

            cy.getBySel('button-create-tournament').click();
            cy.getBySel('input-create-tournament-name').type(name);
            cy.getBySel('button-create-tournament-submit').click();
            cy.successSnackbar();

            cy.getBySel('select-tournament').click();
            cy.get('mat-option').contains(name).click();

            cy.getBySel('input-tournament-round-from-date').type('07/21/2025', { force: true });
            cy.getBySel('input-tournament-round-to-date').type('07/22/2025', { force: true });
            cy.getBySel('input-team-auto-complete-home').first().type(Users.teamAdmin.team);
            cy.get('mat-option').contains(Users.teamAdmin.team).click();
            cy.getBySel('input-team-auto-complete-guest').first().click();
            cy.get('mat-option').first().click();
            cy.getBySel('button-add-match-to-tournament-round').click();
            cy.getBySel('button-save-tournament-round').click();
            cy.successSnackbar();

            cy.getBySel('button-create-next-tournament-round').click();
            cy.getBySel('input-tournament-round-from-date').type('07/21/2025', { force: true });
            cy.getBySel('input-tournament-round-to-date').type('07/22/2025', { force: true });
            cy.getBySel('input-team-auto-complete-home').first().type(Users.teamAdmin.team);
            cy.get('mat-option').contains(Users.teamAdmin.team).click();
            cy.getBySel('input-team-auto-complete-guest').first().click();
            cy.get('mat-option').first().click();
            cy.getBySel('button-add-match-to-tournament-round').click();
            cy.getBySel('button-save-tournament-round').click();
            cy.successSnackbar();

            cy.getBySel('button-start-tournament').click();
            cy.successSnackbar();

            if (i % 2 === 0) {
                cy.getBySel('button-end-tournament').click();
                cy.getBySel('button-confirm-yes').click();
            }

        }
    });

    it('Should select a Tournament and edit a match as a admnin', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').first().click();

        cy.getBySel('button-edit-match-result').first().click();
        cy.getBySel('input-home-score').clear();
        cy.getBySel('input-home-score').type(faker.number.int({ min: 0, max: 99}).toString(), { force: true });
        cy.getBySel('input-guest-score').clear();
        cy.getBySel('input-guest-score').type(faker.number.int({ min: 0, max: 99}).toString(), { force: true });
        cy.getBySel('button-edit-match-result-submit').click();
        cy.successSnackbar();

        cy.getBySel('button-schedule-match').first().click();
        cy.getBySel('input-time').clear();
        cy.getBySel('input-time').type('09:00');
        cy.getBySel('input-kickoff-date').clear();
        cy.getBySel('input-kickoff-date').type('07/21/2025', { force: true });
        cy.getBySel('button-schedule-match-submit').click();
        cy.successSnackbar();

        cy.getBySel('button-set-pitch').first().click();
        cy.get('mat-option').first().click();
        cy.getBySel('button-save-pitch').click();
        cy.successSnackbar();

    });

    it('Should select a Tournament and edit a match as a team-admin', () => {

        cy.login(Users.teamAdmin.username, Users.teamAdmin.password);

        cy.visit('/');
        cy.getBySel('route-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').first().click();

        cy.getBySel('button-next-matchday').click();

        cy.getBySel('button-edit-match-result').first().click();
        cy.getBySel('input-home-score').clear();
        cy.getBySel('input-home-score').type(faker.number.int({ min: 0, max: 99}).toString(), { force: true });
        cy.getBySel('input-guest-score').clear();
        cy.getBySel('input-guest-score').type(faker.number.int({ min: 0, max: 99}).toString(), { force: true });
        cy.getBySel('button-edit-match-result-submit').click();
        cy.successSnackbar();

        cy.getBySel('button-schedule-match').first().click();
        cy.getBySel('input-time').clear();
        cy.getBySel('input-time').type('09:00');
        cy.getBySel('input-kickoff-date').clear();
        cy.getBySel('input-kickoff-date').type('07/21/2025', { force: true });
        cy.getBySel('button-schedule-match-submit').click();
        cy.successSnackbar();

        cy.getBySel('button-set-pitch').first().click();
        cy.get('mat-option').first().click();
        cy.getBySel('button-save-pitch').click();
        cy.successSnackbar();

    });

    it('Should go to Tournament', () => {

        cy.visit('/');
        cy.getBySel('route-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').first().click();

        cy.get('lima-tournament').should('exist');

        cy.getBySel('cant-edit-match-result').should('exist');
        cy.getBySel('cant-schedule-match').should('exist');
        cy.getBySel('cant-set-pitch').should('exist');

    });

    it('Should go to History Tournament', () => {

        cy.visit('/');
        cy.getBySel('route-history').first().click();
        cy.getBySel('route-history-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').first().click();

        cy.get('lima-tournament').should('exist');

        cy.getBySel('cant-edit-match-result').should('exist');
        cy.getBySel('cant-schedule-match').should('exist');
        cy.getBySel('cant-set-pitch').should('exist');

    });

    it('Should go to History Tournament as a Admin', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-history').first().click();
        cy.getBySel('route-history-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').first().click();

        cy.get('lima-tournament').should('exist');

        cy.getBySel('cant-edit-match-result').should('exist');
        cy.getBySel('cant-schedule-match').should('exist');
        cy.getBySel('cant-set-pitch').should('exist');

    });

    it('Should go to History Tournament as a Teamadmin', () => {

        cy.login(Users.teamAdmin.username, Users.teamAdmin.password);

        cy.visit('/');
        cy.getBySel('route-history').first().click();
        cy.getBySel('route-history-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').first().click();

        cy.get('lima-tournament').should('exist');

        cy.getBySel('button-edit-match-result').should('not.exist');
        cy.getBySel('button-schedule-match').should('not.exist');
        cy.getBySel('button-set-pitch').should('not.exist');

    });

});
