// Test d'authentification E2E avec Cypress
// À compléter selon les scénarios d'authentification

let user;

before(() => {
  user = {
    pseudo: `testuser_${Date.now()}`,
    email: `testuser_${Date.now()}@example.com`,
    password: 'password123'
  };
  cy.request('POST', 'http://localhost:3001/users', user)
    .then((response) => {
      expect(response.status).to.eq(201);
      user.id = response.body.id;
    });
});

it('devrait créer un nouvel utilisateur et retourner les bonnes infos', () => {
  expect(user).to.have.property('id');
});

it('devrait échouer à créer un utilisateur déjà existant', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/users',
    body: user,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.not.eq(201);
    // Selon l'API, adapte le code d'erreur attendu (409, 400, etc.)
  });
});

it('devrait authentifier un utilisateur existant', () => {
  cy.request('POST', 'http://localhost:3001/auth/login', {
    pseudo: user.pseudo,
    password: user.password
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('access_token');
  });
});

it('devrait authentifier un utilisateur (à compléter)', () => {
  // TODO: écrire le test
}); 