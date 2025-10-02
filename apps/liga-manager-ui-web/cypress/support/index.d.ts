/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    createTeams()
    login(email: string, password: string)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBySel(selector: CySelectors): Chainable<any>
  }
}
