// import { APP_ROUTES } from "@lima/app.routes"

describe('Table', () => {
    it('Should go to Table', () => {
        cy.visit(`/table`)
        cy.get('lima-table').should('exist')
    })
    it('Should select a Season', () => {
        cy.visit(`/table`)
        cy.get('mat-select').first().click().get('mat-option').first().click();
        cy.get('table').should('exist');
    })
})
