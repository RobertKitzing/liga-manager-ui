import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "dnpc8n",
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'http://localhost:4200',
  },
  retries: {
    runMode: 2,
  }
})