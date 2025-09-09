import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'app.v1.manager.wildeligabremen.de',
    appName: 'Wilde Liga Bremen Manager',
    webDir: '../../dist/apps/liga-manager-ui-web/browser',
    android: {
        buildOptions: {
            keystoreAlias: 'release',
            keystorePath: '../release.jks',
            signingType: 'apksigner',
        },
    },
    server: {
        androidScheme: 'https',
    },
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
    },
};

export default config;
