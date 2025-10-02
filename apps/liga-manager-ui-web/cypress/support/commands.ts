import { graphql } from '@cypress/api';
import { Users } from '@cypress/fixtures';
import { Base64 } from 'js-base64';
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';

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


const createTeams = (count: number = 10) => {
    getToken(Users.admin.username, Users.admin.password).then(
        (token) => {
            let query = 'mutation CreateTeam {\n';
            const teams = Array.from({ length: count }, () => ({ name: faker.person.firstName() }) );
            for (const i in teams) {
                query += `createTeam${i}: createTeam(id: "${v4()}", name: "${teams[i].name }")`;
            }
            query += '}';
            const body = {
                query,
                variables: {},
            };
            cy.request({
                method: 'POST',
                url: '/api/graphql',
                body,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        },
    );
};

Cypress.Commands.add('login', login );
Cypress.Commands.add('createTeams', createTeams );
