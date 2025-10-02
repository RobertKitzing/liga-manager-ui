import { Users } from '@cypress/fixtures';
import { graphql } from './gen';
import { Base64 } from 'js-base64';
import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';
import { CreateUserMutationVariables, UserRole } from './gen/graphql';

function getAdminToken(baseUrl: string) {
    return new Promise<string>(
        (resolve, reject) => {
            const query = graphql('query AuthenticatedUserId {\n  authenticatedUser {\n    id\n  }\n}');
            const body = {
                query,
                variables: {},
            };

            fetch(`${baseUrl}/api/graphql`,{
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Basic ${Base64.encode(
                        Users.admin.username.toLowerCase() +
                            ':' +
                            Users.admin.password,
                    )}`,
                },
            }).then(
                (res) => {
                    const token = res.headers.get('x-token');
                    if (token) {
                        resolve(token);
                    } else {
                        res.text().then((e) => console.log(e));
                        reject();
                    }
                },
            );
        },
    );
}

export function prepareApi(baseUrl: string, teamCount: number = 10) {

    return new Promise(
        (resolve, reject) => {
            getAdminToken(baseUrl).then(
                async (token) => {
                    let query = 'mutation CreateTeams {\n';
                    const teams = Array.from({ length: teamCount }, () => ({ id: v4(), name: faker.person.firstName() }) ).concat([{ id: v4(), name: Users.teamAdmin.team }]);
                    for (const i in teams) {
                        query += `createTeam${i}: createTeam(id: "${teams[i].id}", name: "${teams[i].name }")`;
                    }
                    query += '}';
                    const body = {
                        query,
                        variables: {},
                    };
                    fetch(`${baseUrl}/api/graphql`, {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }).then(
                        () => {
                            const query = graphql('mutation CreateUser($user_id: String, $email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: String!, $team_ids: [String]!) {\n  createUser(\n    id: $user_id\n    email: $email\n    password: $password\n    first_name: $first_name\n    last_name: $last_name\n    role: $role\n    team_ids: $team_ids\n  )\n}');
                            const variables: CreateUserMutationVariables = {
                                email: Users.teamAdmin.username,
                                first_name: faker.person.firstName(),
                                last_name: faker.person.lastName(),
                                password: Users.teamAdmin.password,
                                role: UserRole.TeamManager,
                                user_id: v4(),
                                team_ids: [ teams.find((t) => t.name === Users.teamAdmin.team)!.id ],
                            };
                            const body = {
                                query,
                                variables,
                            };
                            fetch(`${baseUrl}/api/graphql`, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: {
                                    'Content-type': 'application/json',
                                    'Authorization': `Bearer ${token}`,
                                },
                            }).then(
                                (res) => {
                                    resolve(res);
                                },
                            ).catch(
                                (error) => {
                                    reject(error);
                                },
                            );
                        },
                    ).catch(
                        (error) => {
                            reject(error);
                        },
                    );
                },
            );
        },
    );
}
