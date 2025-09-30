import { Users } from '@cypress/fixtures';

describe('Create User', () => {

    it('Should create a user', () => {

        cy.login(Users.admin.username, Users.admin.password);
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-users').first().click();
        cy.getBySel('button-create-user').click();
        cy.getBySel('input-email').type('user@example.com');
        cy.getBySel('input-first-name').type('first');
        cy.getBySel('input-last-name').type('last');
        cy.getBySel('select-team').click();
        cy.get('mat-option').first().click();
        cy.getBySel('button-save-user').click({ force: true });
    });

    it('Should read an email', () => {
        cy.maildevGetLastMessage().then(
            (email) => {
                expect(email.to[0].address).to.equal('user@example.com');
                const html = email.html;
                cy.document().then( (doc) => doc.documentElement.innerHTML = html );
                cy.get('a').click();
            },
        );
    });

});
