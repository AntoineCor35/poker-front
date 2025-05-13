const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'src/__tests__/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000', // adapte si besoin
  },
}); 