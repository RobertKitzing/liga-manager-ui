import enGB from '@lima-i18n/en-GB.json';

describe('Table', () => {
    it('Should go to Table', () => {
        cy.visit(`/`)
        cy.contains(enGB['NAVIGATION.TABLE']).click();
        cy.get('lima-table').should('exist')
        cy.contains(enGB['PLACEHOLDER.SELECT_SEASON']).click().get('mat-option').first().click();
        cy.get('table').should('exist');
    })
})
