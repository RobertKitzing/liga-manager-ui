import { graphql } from '@cypress/api';
import { Base64 } from 'js-base64';

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-cy="${selector}"]`, ...args);
});

const login = (username: string, password: string) => {
    const query = graphql('query AuthenticatedUserId {\n  authenticatedUser {\n    id\n  }\n}');
    const body = {
        query,
        variables: {},
    };
    cy.request({
        method: 'POST',
        url: '/api/graphql',
        body,
        headers: {
            'Authorization': `Basic ${Base64.encode(
                username.toLowerCase() +
                    ':' +
                    password,
            )}`,
        },
    }).then(
        (res) => {
            localStorage.setItem('auth.token', `"${res.headers['x-token']}"`);
        },
    );
};

Cypress.Commands.add('login', login );
