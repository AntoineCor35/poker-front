// Support file for Cypress E2E tests

Cypress.Commands.add('loginByApi', (pseudo, password) => {
  cy.request('POST', 'http://localhost:3001/auth/login', { pseudo, password })
    .then((response) => {
      // Log complet de la réponse pour debug
      // eslint-disable-next-line no-console
      console.log('Réponse API login:', response);
      expect(response.status).to.eq(200);
      const { access_token } = response.body;
      window.localStorage.setItem('token', access_token);
      // Décoder le token pour stocker l'utilisateur (optionnel, selon l'app)
      // window.localStorage.setItem('user', JSON.stringify(jwtDecode(access_token)));
    });
});
