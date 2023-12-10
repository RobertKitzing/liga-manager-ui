import { APP_ROUTES } from "@lima/app.routes.enum"

describe('Table', () => {
    it('Should go to Table', () => {
        cy.visit(`/${APP_ROUTES.SCHEDULE}`)
        cy.get('lima-schedule').should('exist')
    })
    it('Should select a Season', () => {
        cy.visit(`/${APP_ROUTES.SCHEDULE}`)
        cy.get('mat-select').first().click().get('mat-option').first().click();
        cy.get('h3').should('exist');
    })
})
