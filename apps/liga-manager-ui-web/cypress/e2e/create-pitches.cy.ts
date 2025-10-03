import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';

describe('Create Pitch', () => {

    it('Should create a Pitch', () => {

        cy.login(Users.admin.username, Users.admin.password);
        cy.visit('/');
        cy.getBySel('route-admin').first().click();
        cy.getBySel('route-admin-pitches').first().click();

        const pitches = Array.from({ length: 10 }, () => ({
            name: faker.location.city(),
            longitude: faker.location.longitude().toString(),
            latitude: faker.location.latitude().toString(),
        }));

        for (const pitch of pitches) {
            cy.getBySel('button-create-pitch').click();
            cy.getBySel('input-pitch-name').first().type(pitch.name);
            cy.getBySel('input-longitude').first().type(pitch.longitude);
            cy.getBySel('input-latitude').first().type(pitch.latitude);
            cy.getBySel('button-save-pitch').click();
            cy.getBySel('snackbar-success').should('exist');
        }

    });

});
