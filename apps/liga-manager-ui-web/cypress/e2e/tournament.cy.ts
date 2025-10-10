import { Users } from '@cypress/fixtures';
import { futureDateSpan } from '@cypress/helper';
import { verifyEditMatchResult, verifyScheduleMatch, verifySetPitch } from '@cypress/helper/edit-match-result';
import { faker } from '@faker-js/faker';

describe('Tournament', () => {

    let names: string[];

    before(
        () => {
            names = faker.helpers.uniqueArray(faker.person.lastName, 2);
        },
    );

    it('Should create Tournaments', () => {
        cy.login(Users.admin.username, Users.admin.password);
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-tournaments').first().click();

        names.forEach(
            (name) => {
                cy.getBySel('button-create-tournament').click();
                cy.getBySel('input-create-tournament-name').type(name);
                cy.getBySel('button-create-tournament-submit').click();
                cy.successSnackbar();
            },
        );
    });

    it('Should create Tournamentrounds', () => {
        cy.login(Users.admin.username, Users.admin.password);
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-tournaments').first().click();

        names.forEach(
            (name) => {
                cy.getBySel('select-tournament').click();
                cy.get('mat-option').contains(name).click();

                let date = futureDateSpan();

                cy.getBySel('input-tournament-round-from-date').type(date.from, { force: true });
                cy.getBySel('input-tournament-round-to-date').type(date.to, { force: true });
                cy.getBySel('input-team-auto-complete-home').first().type(Users.teamAdmin.team);
                cy.get('mat-option').contains(Users.teamAdmin.team).click();
                cy.getBySel('input-team-auto-complete-guest').first().click();
                cy.get('mat-option').first().click();
                cy.getBySel('button-add-match-to-tournament-round').click();
                cy.getBySel('button-save-tournament-round').click();
                cy.successSnackbar();

                date = futureDateSpan();

                cy.getBySel('button-create-next-tournament-round').click();
                cy.getBySel('input-tournament-round-from-date').type(date.from, { force: true });
                cy.getBySel('input-tournament-round-to-date').type(date.to, { force: true });
                cy.getBySel('input-team-auto-complete-home').first().type(Users.teamAdmin.team);
                cy.get('mat-option').contains(Users.teamAdmin.team).click();
                cy.getBySel('input-team-auto-complete-guest').first().click();
                cy.get('mat-option').first().click();
                cy.getBySel('button-add-match-to-tournament-round').click();
                cy.getBySel('button-save-tournament-round').click();
                cy.successSnackbar();

            },
        );
    });

    it('Should start Tournaments', () => {
        cy.login(Users.admin.username, Users.admin.password);
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-tournaments').first().click();

        names.forEach(
            (name) => {
                cy.getBySel('select-tournament').click();
                cy.get('mat-option').contains(name).click();
                cy.getBySel('button-start-tournament').click();
                cy.successSnackbar();
            },
        );
    });

    it('Should end a Tournament', () => {
        cy.login(Users.admin.username, Users.admin.password);
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-tournaments').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').contains(names[1]).click();
        cy.getBySel('button-end-tournament').click();
        cy.getBySel('button-confirm-yes').click();
        cy.successSnackbar();
    });

    it('Should select a Tournament and edit a match as a admnin', () => {

        cy.login(Users.admin.username, Users.admin.password);

        cy.visit('/');
        cy.getBySel('route-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').contains(names[0]).click();

        verifyEditMatchResult();

        verifyScheduleMatch();

        verifySetPitch();

    });

    it('Should select a Tournament and edit a match as a team-admin', () => {

        cy.login(Users.teamAdmin.username, Users.teamAdmin.password);

        cy.visit('/');
        cy.getBySel('route-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').contains(names[0]).click();

        cy.getBySel('button-next-matchday').click();

        verifyEditMatchResult();

        verifyScheduleMatch();

        verifySetPitch();

    });

    it('Should go to Tournament', () => {

        cy.visit('/');
        cy.getBySel('route-tournament').first().click();

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').contains(names[0]).click();

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
        cy.get('mat-option').contains(names[1]).click();

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
        cy.get('mat-option').contains(names[1]).click();

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
        cy.get('mat-option').contains(names[1]).click();

        cy.get('lima-tournament').should('exist');

        cy.getBySel('button-edit-match-result').should('not.exist');
        cy.getBySel('button-schedule-match').should('not.exist');
        cy.getBySel('button-set-pitch').should('not.exist');

    });

});
