import { Tournaments } from '@cypress/fixtures';

describe('Public - Select Tournament', () => {

    it('Should select a Tournament', () => {

        cy.visit('/')
        cy.getBySel('route-tournament').first().click();

        cy.intercept('POST', '/api/graphql').as('tournament-list');
        cy.wait(['@tournament-list'])

        cy.getBySel('select-tournament').click();
        cy.get('mat-option').contains(Tournaments[0].name).click();

        cy.intercept('POST', '/api/graphql').as('tournament-id');
        cy.wait(['@tournament-id'])

        cy.get('lima-match').should('have.length', 2);

        cy.getBySel('button-next-matchday').click();

        cy.get('lima-match').should('have.length', 1);

        cy.getBySel('button-prev-matchday').click();

        cy.get('lima-match').should('have.length', 2);

    });

});