import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1080,
  viewportHeight: 1920,
  e2e: {
    baseUrl: 'http://localhost:4200',
    experimentalStudio: true
  },

})