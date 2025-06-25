/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string)
    getBySel(selector: CySelectors): Chainable<any>
  }
}