import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'app.v1.manager.wildeligabremen.de',
    appName: 'Wilde Liga Bremen Manager',
    webDir: '../../dist/apps/liga-manager-ui-web/browser',
    android: {
        loggingBehavior: 'debug',
    },
    server: {
        androidScheme: 'http',
        cleartext: true,
    },
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
    },
};

export default config;
