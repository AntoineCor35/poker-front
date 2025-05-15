// Test end-to-end complet du parcours utilisateur sur l'API Poker

describe('E2E - Parcours complet API Poker', () => {
  const apiUrl = 'http://localhost:3001';
  let user;
  let token;
  let tableId;

  before(() => {
    // 1. Crée un utilisateur unique
    user = {
      pseudo: `e2euser_${Date.now()}`,
      email: `e2euser_${Date.now()}@example.com`,
      password: 'password123'
    };
    cy.request('POST', `${apiUrl}/users`, user).then((res) => {
      expect(res.status).to.eq(201);
    });
  });

  it('Authentifie l\'utilisateur et récupère un token', () => {
    cy.request('POST', `${apiUrl}/auth/login`, {
      pseudo: user.pseudo,
      password: user.password
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('access_token');
      token = res.body.access_token;
    });
  });

  it('Récupère une table disponible', () => {
    cy.request('GET', `${apiUrl}/tables`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array').and.not.be.empty;
      tableId = res.body[0].id;
    });
  });

  it('Rejoint la table', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/tables/${tableId}`,
      body: { action: 'join' },
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('success', true);
      expect(res.body.table).to.exist;
      // Vérifie que le joueur est bien dans la table
      const me = res.body.table.players.find(p => p.name === user.pseudo);
      expect(me).to.exist;
    });
  });

  it('Joue une action (fold)', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/tables/${tableId}`,
      body: { action: 'fold' },
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body.table).to.exist;
      const me = res.body.table.players.find(p => p.name === user.pseudo);
      expect(me).to.exist;
      expect(me.hasFolded).to.be.true;
    });
  });
}); 