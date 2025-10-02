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
        },
        setupNodeEvents(on) {
            on('before:run', () => {
                execSync(`docker exec lima-api lima app:user:create --email ${Users.admin.username} --password ${Users.admin.password} --role admin --first-name admin --last-name admin --locale en`);
                execSync(`docker exec lima-api lima app:user:create --email ${Users.teamAdmin.username} --password ${Users.teamAdmin.password} --role team_manager --first-name team --last-name admin --locale en`);
            });
        },
        experimentalInteractiveRunEvents: false,
    },
});
