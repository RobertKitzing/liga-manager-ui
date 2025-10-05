import { Pitch } from '@cypress/api/gen/graphql';
import { Users } from '@cypress/fixtures';
import { faker } from '@faker-js/faker';

describe('Create Pitch', () => {

    let pitch: Omit<Pitch, 'id'>;

    before(
        () => {
            pitch = {
                label: faker.location.country(),
                location_longitude: faker.location.longitude(),
                location_latitude: faker.location.latitude(),
            };
        },
    );

    beforeEach(
        () => {
            cy.login(Users.admin.username, Users.admin.password);
            cy.visit('/');
            cy.getBySel('route-admin').first().click();
            cy.getBySel('route-admin-pitches').first().click();
        },
    );

    it('Should create a Pitch', () => {

        cy.getBySel('button-create-pitch').click();
        cy.getBySel('input-pitch-name').first().type(pitch.label);
        cy.getBySel('input-longitude').first().type(pitch.location_longitude.toString());
        cy.getBySel('input-latitude').first().type(pitch.location_latitude.toString());
        cy.getBySel('button-save-pitch').click();
        cy.successSnackbar();

    });

    it('Should delete a Pitch', () => {

        cy.getBySel('input-search-pitch').type(pitch.label);
        cy.getBySel('button-delete-pitch').click();
        cy.getBySel('button-confirm-yes').click();
        cy.successSnackbar();

    });

});
