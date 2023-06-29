import { SheriffConfig, sameTag } from '@softarc/sheriff-core';

export const sheriffConfig: SheriffConfig = {
    version: 1,
    tagging: {
        'src/app': {
            'shared/<type>': ['shared:<type>'],
            '<domain>': ['domain:<domain>'],
        },
        'src/api': {
            '<domain>': 'api:<domain>',
        },
    },
    depRules: {
        root: ['domain:*', 'shared:*'],
        'domain:*': [sameTag, 'shared:*'],
        'shared:*': [sameTag, 'shared:*'],
        'shared:services': ['api:*'],
    },
};
