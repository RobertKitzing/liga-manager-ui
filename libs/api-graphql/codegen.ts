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
                    'import { ApiDateTime } from \'./api-date-time\'',
                    'import { ApiDate } from \'./api-date\'',
                ],
                flattenGeneratedTypes: true,
                flattenGeneratedTypesIncludeFragments: true,
                skipTypeNameForRoot: true,
                preResolveTypes: false,
                strictScalars: true,
                defaultScalarType: 'unknown',
                scalars: {
                    DateTime: 'ApiDateTime',
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
        'libs/api-graphql/src/mock/mock.ts': {
            config: {
                content: [
                    '/* eslint-disable */',
                    '/* GENERATED DO NOT EDIT */',
                    'import { apiDateGenerator, apiDateTimeGenerator, dateStringGenerator } from \'./generators\'',
                ],
                typesFile: 'libs/api-graphql/src/gen/graphql.ts',
                scalars: {
                    DateTime: 'apiDateTimeGenerator()',
                    Date: 'apiDateGenerator()',
                },
                fieldGeneration: {
                    Match: {
                        cancelled_at: 'dateStringGenerator()',
                    },
                },
            },
            plugins: [
                'add',
                'typescript-mock-data',
            ],
        },
    },
};

export default config;
