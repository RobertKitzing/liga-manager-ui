describe('Table', () => {
    it('Should go to Table', () => {
        cy.visit(`/`)
        cy.getBySel('route-table').first().click();
        cy.get('lima-table').should('exist')
        cy.getBySel('select-season').click().get('mat-option').first().click();
    })
})
