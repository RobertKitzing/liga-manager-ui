import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: ['http://localhost/api/graphql'],
    documents: 'libs/api-graphql/graphql/**/*.graphql',
    overwrite: true,
    generates: {
        'libs/api-graphql/src/gen/graphql.ts': {
            config: {
                content: [
                    '/* eslint-disable */',
                    '/* GENERATED DO NOT EDIT */',
                    'import { ApiDate } from \'./api-date\'',
                ],
                flattenGeneratedTypes: true,
                flattenGeneratedTypesIncludeFragments: true,
                skipTypeNameForRoot: true,
                preResolveTypes: false,
                strictScalars: false,
                defaultScalarType: 'unknown',
                scalars: {
                    DateTime: 'Date',
                    Date: 'ApiDate',
                },
                skipTypename: true,
                dedupeFragments: true,
            },
            plugins: [
                'add',
                'typescript',
                'typescript-operations',
                'typescript-apollo-angular',
            ],
        },
    },
};

export default config;
