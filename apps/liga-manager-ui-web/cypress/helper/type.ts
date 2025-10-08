import { CySelectors } from '@liga-manager-ui/directives';

export function type(selector: CySelectors, value: string) {
    cy.getBySel(selector).click();
    cy.getBySel(selector).clear();
    cy.getBySel(selector).type(value);
}