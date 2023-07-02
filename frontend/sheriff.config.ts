import { SheriffConfig, sameTag } from '@softarc/sheriff-core';

export const sheriffConfig: SheriffConfig = {
    version: 1,
    tagging: {
        src: {
            app: {
                'shared/<type>/<feature>': ['shared:<type>:<feature>'],
                'shared/<type>': ['shared:<type>'],
                '<domain>': ['domain:<domain>'],
            },
            api: {
                '<domain>': 'api:<domain>',
            },
        },
    },
    depRules: {
        root: [sameTag, 'domain:*', 'shared:*', 'api:openapi'],
        'domain:*': [sameTag, 'shared:*'],
        'shared:*': [sameTag, 'shared:*'],
        'shared:services': ['api:*'],
        'domain:history': [
            'domain:table',
            'domain:schedule',
            'domain:tournament',
        ],
    },
};
