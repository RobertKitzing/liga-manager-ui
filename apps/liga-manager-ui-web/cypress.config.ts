import { prepareApi } from '@cypress/api';
import { Users } from '@cypress/fixtures';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import { execSync } from 'node:child_process';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:4200',
        projectId: 'dnpc8n',
        viewportWidth: 1920,
        viewportHeight: 1080,
        video: true,
        ...nxE2EPreset(__filename, {
            cypressDir: 'cypress',
        }),
        retries: 3,
        env: {
            MAILDEV_PROTOCOL: 'http',
            MAILDEV_HOST: 'localhost',
            MAILDEV_SMTP_PORT: '1025',
            MAILDEV_API_PORT: '1080',
            CYPRESS_LANG: 'de',
        },
        setupNodeEvents(on) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            on('before:run', (details: any) => {
                try {
                    execSync(`docker exec lima-api lima app:user:create --email ${Users.admin.username} --password ${Users.admin.password} --role admin --first-name admin --last-name admin --locale en`);
                    prepareApi(details.config.baseUrl || 'http://localhost', 10).catch((e) => { throw e; });
                } catch(_err) {
                    console.log('prepare skipped');
                }
            });
        },
        experimentalInteractiveRunEvents: false,
    },
});
