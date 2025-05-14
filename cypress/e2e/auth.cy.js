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

it('devrait refuser la création d\'un utilisateur avec une injection SQL dans le pseudo', () => {
  const maliciousUser = {
    pseudo: "' OR 1=1;--",
    email: `malicious_${Date.now()}@example.com`,
    password: 'password123'
  };
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/users',
    body: maliciousUser,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.not.eq(201);
    // Optionnel : vérifier le message d'erreur
    // expect(response.body.message).to.include('invalid');
  });
});

it('devrait refuser l\'authentification avec une injection SQL dans le pseudo', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/auth/login',
    body: {
      pseudo: "' OR 1=1;--",
      password: 'nimportequoi'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.not.eq(200);
  });
});

it('devrait empêcher l\'injection XSS dans le pseudo', () => {
  const xssUser = {
    pseudo: "<script>alert('xss')</script>",
    email: `xss_${Date.now()}@example.com`,
    password: 'password123'
  };
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/users',
    body: xssUser,
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 201) {
      // Si l'API accepte, on vérifie que le pseudo renvoyé n'est pas le code brut
      expect(response.body.pseudo).to.not.eq(xssUser.pseudo);
      expect(response.body.pseudo).to.not.include('<script>');
    } else {
      // Sinon, on attend un code d'erreur
      expect(response.status).to.not.eq(201);
    }
  });
}); 