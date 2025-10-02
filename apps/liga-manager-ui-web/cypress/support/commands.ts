import { graphql } from '@cypress/api';
import { Base64 } from 'js-base64';

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-cy="${selector}"]`, ...args);
});

function getToken(username: string, password: string): Promise<string> {
    return new Promise<string>(
        (resolve) => {
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
                (response) => {
                    resolve(response.headers['x-token'].toString());
                },
            );
        },
    );
}

const login = (username: string, password: string) => {
    getToken(username, password).then(
        (token) => {
            localStorage.setItem('auth.token', `"${token}"`);
        },
    );
};

Cypress.Commands.add('login', login );
