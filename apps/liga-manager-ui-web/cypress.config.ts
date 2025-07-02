import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

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
    },
});
