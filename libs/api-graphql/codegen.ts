import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: ['http://localhost/api/graphql'],
    documents: 'libs/api-graphql/graphql/**/*.graphql',
    overwrite: true,
    generates: {
        'libs/api-graphql/src/gen/graphql.ts': {
            config: {
                flattenGeneratedTypes: true,
                flattenGeneratedTypesIncludeFragments: true,
                skipTypeNameForRoot: true,
                preResolveTypes: false,
                addExplicitOverride: true,
            },
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-apollo-angular',
            ],
        },
    },
};

export default config;
