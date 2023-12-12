import enGB from '@lima-i18n/en-GB.json';

describe('Schedule', () => {
    it('Should go to Schedule', () => {
        cy.visit(`/`)
        cy.contains(enGB['NAVIGATION.SCHEDULE']).click();
        cy.get('lima-schedule').should('exist')
        cy.contains(enGB['PLACEHOLDER.SELECT_SEASON']).click().get('mat-option').first().click();
        cy.get('h3').should('exist');
    })
})
