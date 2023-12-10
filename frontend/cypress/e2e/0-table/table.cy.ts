import { APP_ROUTES } from '@lima/app.routes.enum'

describe('Table', () => {
    it('Should go to Table', () => {
        cy.visit(`/${APP_ROUTES.TABLE}`)
        cy.get('lima-table').should('exist')
    })
    it('Should select a Season', () => {
        cy.visit(`/${APP_ROUTES.TABLE}`)
        cy.get('mat-select').first().click().get('mat-option').first().click();
        cy.get('table').should('exist');
    })
})
