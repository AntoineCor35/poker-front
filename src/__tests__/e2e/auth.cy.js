// Test d'authentification E2E avec Cypress
// À compléter selon les scénarios d'authentification

describe('Authentification', () => {
  it('devrait créer un nouvel utilisateur et retourner les bonnes infos', () => {
    const user = {
      pseudo: `testuser_${Date.now()}`,
      email: `testuser_${Date.now()}@example.com`,
      password: 'password123'
    };
    cy.request('POST', 'http://localhost:3001/users', user)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('pseudo', user.pseudo);
        expect(response.body).to.have.property('email', user.email);
        expect(response.body).to.have.property('bank', 1000);
        expect(response.body).to.have.property('victoryStats', 0);
        expect(response.body).to.not.have.property('password');
      });
  });

  it('devrait authentifier un utilisateur (à compléter)', () => {
    // TODO: écrire le test
  });
}); 