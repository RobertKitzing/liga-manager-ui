describe('Schedule', () => {
    it('Should go to Schedule', () => {
        cy.visit(`/`)
        cy.get('[data-cy="route-schedule"]').first().click();
        cy.get('lima-schedule').should('exist')
        cy.getBySel('select-season').click().get('mat-option').first().click();
    })
})
