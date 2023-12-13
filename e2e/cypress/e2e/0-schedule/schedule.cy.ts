import * as enGB from '@lima-i18n/en-GB.json';

describe('Schedule', () => {
    it('Should go to Schedule', () => {
        cy.visit(`/`)
        cy.contains(enGB['NAVIGATION.SCHEDULE']).click({ force: true });
        cy.get('lima-schedule').should('exist')
        cy.get('[data-cy="select-season"]').click().get('mat-option').first().click();
        cy.get('h3').should('exist');
    })
})
