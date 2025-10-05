import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';
import { JSDOM } from 'jsdom';

describe('Create User', () => {

    let email: string;
    let password: string;

    before(
        () => {
            cy.maildevDeleteAllMessages();
            email = faker.internet.email({ provider: 'example.com'});
            password = faker.internet.password({ length: 6});
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
        cy.getBySel('button-save-user').click({ force: true });
        cy.getBySel('snackbar-success').should('exist');
    });

    it('Should get an inventation email', () => {
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
                        cy.getBySel('input-password').type(password);
                        cy.getBySel('button-save-user').click();
                        cy.getBySel('snackbar-success').should('exist');
                    },
                );
            },
        );
    });

    it('Should login', () => {
        cy.visit('/');
        cy.getBySel('button-login').click();
        cy.getBySel('input-username').type(email);
        cy.getBySel('input-password').type(password);
        cy.getBySel('button-login-submit').click();
        cy.getBySel('button-user-menu').should('exist');
    });

    it('Should change the password', () => {
        cy.visit('/');
        cy.getBySel('button-login').click();
        cy.getBySel('input-username').type(email);
        cy.getBySel('button-password-reset').click();
        cy.getBySel('snackbar-success').should('exist');
        cy.maildevGetLastMessage().then(
            (message) => {
                expect(message.to[0].address).to.equal(email);
                const jsDom = new JSDOM(message.html);
                const href = jsDom.window.document.getElementsByTagName('a')[0].getAttribute('href');
                cy.visit(href!).then(
                    () => {
                        password = faker.internet.password({ length: 6});
                        cy.getBySel('input-password').clear({ force: true });
                        cy.getBySel('input-password').type(password);
                        cy.getBySel('button-change-password-submit').click();
                    },
                );
            },
        );
    });

    it('Should login again with changed password', () => {
        cy.visit('/');
        cy.getBySel('button-login').click();
        cy.getBySel('input-username').type(email);
        cy.getBySel('input-password').type(password);
        cy.getBySel('button-login-submit').click();
        cy.getBySel('button-user-menu').should('exist');
    });

});
