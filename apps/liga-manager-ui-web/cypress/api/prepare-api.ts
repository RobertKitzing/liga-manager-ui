import { Users } from '@cypress/fixtures';
import { graphql } from './gen';
import { Base64 } from 'js-base64';
import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';
import { CreateUserMutationVariables, UserRole } from './gen/graphql';

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAdminToken(baseUrl: string, retries = 10): Promise<string> {
    const query = graphql('query AuthenticatedUserId {\n  authenticatedUser {\n    id\n  }\n}');

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(`${baseUrl}/api/graphql`, {
                method: 'POST',
                body: JSON.stringify({ query, variables: {} }),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Basic ${Base64.encode(
                        Users.admin.username.toLowerCase() + ':' + Users.admin.password,
                    )}`,
                },
            });

            const token = res.headers.get('x-token');
            if (token) {
                return token;
            }

            const text = await res.text();
            console.log(`Attempt ${attempt}: No token in response:`, text);
        } catch (err) {
            console.log(`Attempt ${attempt}: fetch failed:`, err);
        }

        await sleep(3000); // wait 3s before retrying
    }

    throw new Error(`Could not get admin token after ${retries} attempts`);
}

export async function prepareApi(baseUrl: string, teamCount = 10, pitchCount = 10) {
    const token = await getAdminToken(baseUrl);

    // Build mutation
    const teams = Array.from(
        faker.helpers.uniqueArray(faker.person.firstName, teamCount),
        (name) => ({ id: v4(), name }),
    ).concat([{ id: v4(), name: Users.teamAdmin.team }]);

    const pitches = Array.from(
        faker.helpers.uniqueArray(faker.location.city, pitchCount),
        (label) => ({
            id: v4(),
            label,
            longitude: faker.location.longitude(),
            latitude: faker.location.latitude(),
        }),
    );

    let query = 'mutation PrepareApi {\n';
    teams.forEach((team, i) => {
        query += `createTeam${i}: createTeam(id: "${team.id}", name: "${team.name}") \n`;
    });
    pitches.forEach((pitch, i) => {
        query += `createPitch${i}: createPitch(id: "${pitch.id}", label: "${pitch.label}", longitude: ${pitch.longitude}, latitude: ${pitch.latitude}) \n`;
    });
    query += '}';

    console.log(query);

    const prepareRes = await fetch(`${baseUrl}/api/graphql`, {
        method: 'POST',
        body: JSON.stringify({ query, variables: {} }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log(prepareRes);

    const createUserQuery = graphql('mutation CreateUser($user_id: String, $email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: String!, $team_ids: [String]!) {\n  createUser(\n    id: $user_id\n    email: $email\n    password: $password\n    first_name: $first_name\n    last_name: $last_name\n    role: $role\n    team_ids: $team_ids\n  )\n}');

    const variables: CreateUserMutationVariables = {
        email: Users.teamAdmin.username,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: Users.teamAdmin.password,
        role: UserRole.TeamManager,
        user_id: v4(),
        team_ids: [teams.find((t) => t.name === Users.teamAdmin.team)!.id],
    };

    const userRes = await fetch(`${baseUrl}/api/graphql`, {
        method: 'POST',
        body: JSON.stringify({ query: createUserQuery, variables }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log(userRes);

    return userRes;
}