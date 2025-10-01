import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';
import { JSDOM } from 'jsdom';

describe('Create User', () => {

    let email: string;

    before(
        () => {
            cy.maildevDeleteAllMessages();
            email = Users.teamAdmin.username;
        },
    );

    it('Should create a user', () => {
        cy.login(Users.admin.username, Users.admin.password);
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-users').first().click();
        cy.getBySel('button-create-user').click();
        cy.getBySel('input-email').type(email);
        cy.getBySel('input-first-name').type(faker.person.firstName());
        cy.getBySel('input-last-name').type(faker.person.lastName());
        cy.getBySel('select-user-role').click();
        cy.getBySel('user-role-team_manager').click();
        cy.getBySel('select-team').click();
        cy.contains('mat-option', Users.teamAdmin.team).scrollIntoView();
        cy.contains('mat-option', Users.teamAdmin.team).click();
        cy.getBySel('button-save-user').click({ force: true });
        cy.getBySel('snackbar-success-send-mail').should('exist');
    });

    it('Should read an email', () => {
        cy.maildevGetLastMessage().then(
            (message) => {
                expect(message.to[0].address).to.equal(email);
                const jsDom = new JSDOM(message.html);
                const href = jsDom.window.document.getElementsByTagName('a')[0].getAttribute('href');
                cy.visit(href!).then(
                    () => {
                        cy.getBySel('input-first-name').clear();
                        cy.getBySel('input-first-name').type(faker.person.firstName());
                        cy.getBySel('input-last-name').clear();
                        cy.getBySel('input-last-name').type(faker.person.lastName());
                        cy.getBySel('input-new-password').type(Users.teamAdmin.password);
                        cy.getBySel('button-save-user').click();
                        cy.getBySel('snackbar-success-edit-profile').should('exist');
                    },
                );
            },
        );
    });

    it('Should login as a TeamAdmin', () => {
        cy.visit('/');
        cy.getBySel('button-login').click();
        cy.getBySel('input-username').type(Users.teamAdmin.username);
        cy.getBySel('input-password').type(Users.teamAdmin.password);
        cy.getBySel('button-login-submit').click();
        cy.getBySel('button-user-menu').should('exist');
    });
    // it('Should change the password', () => {
    //     cy.visit('/');
    //     cy.getBySel('button-login').click();
    //     cy.getBySel('input-username').type(Users.teamAdmin.username);
    //     cy.getBySel('button-password-reset').click();
    //     cy.maildevGetLastMessage().then(
    //         (message) => {
    //             expect(message.to[0].address).to.equal(Users.teamAdmin.username);
    //             const jsDom = new JSDOM(message.html);
    //             const href = jsDom.window.document.getElementsByTagName('a')[0].getAttribute('href');
    //             cy.visit(href!).then(
    //                 () => {
    //                     cy.getBySel('input-new-password').clear();
    //                     cy.getBySel('input-new-password').type(Users.teamAdmin.password);
    //                     cy.getBySel('button-change-password-submit').click();
    //                 },
    //             );
    //         },
    //     );
    // });

});
