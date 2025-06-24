describe('Table', () => {
    it('Should go to Table', () => {
        cy.visit(`/`)
        cy.get('[data-cy="route-table"]').first().click();
        cy.get('lima-table').should('exist')
        cy.get('[data-cy="select-season"]').click().get('mat-option').first().click();
    })
})
