describe('API Tables', () => {
  const apiUrl = 'http://localhost:3001/tables'; // adapte si besoin

  it('GET /tables - doit retourner la liste des tables', () => {
    cy.request('GET', apiUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      // Optionnel : vérifier la structure d'une table
      if (response.body.length > 0) {
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('name');
      }
    });
  });

  it('GET /tables/:id - doit retourner une table précise', () => {
    cy.request('GET', apiUrl).then((response) => {
      const firstTable = response.body[0];
      cy.request('GET', `${apiUrl}/${firstTable.id}`).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('id', firstTable.id);
      });
    });
  });

  it('GET /tables/:id/status - retourne le status pour un joueur authentifié', () => {
    // 1. Crée un utilisateur unique
    const user = {
      pseudo: `testuser_${Date.now()}`,
      email: `testuser_${Date.now()}@example.com`,
      password: 'password123'
    };
    cy.request('POST', 'http://localhost:3001/users', user).then(() => {
      // 2. Login pour obtenir le token
      cy.request('POST', 'http://localhost:3001/auth/login', {
        pseudo: user.pseudo,
        password: user.password
      }).then((loginRes) => {
        const token = loginRes.body.access_token;
        // 3. Récupère une table
        cy.request('GET', 'http://localhost:3001/tables').then((tablesRes) => {
          const tableId = tablesRes.body[0].id;
          // 4. Join la table
          cy.request({
            method: 'POST',
            url: `http://localhost:3001/tables/${tableId}`,
            body: { action: 'join' },
            headers: { Authorization: `Bearer ${token}` }
          }).then(() => {
            // 5. Appelle /tables/:id/status
            cy.request({
              method: 'GET',
              url: `http://localhost:3001/tables/${tableId}/status`,
              headers: { Authorization: `Bearer ${token}` }
            }).then((statusRes) => {
              expect(statusRes.status).to.eq(200);
              expect(statusRes.body).to.have.property('success', true);
              expect(statusRes.body).to.have.property('table');
              // ... autres vérifications selon le retour attendu
            });
          });
        });
      });
    });
  });

  it('POST /tables/:id - action de jeu (fold) pour un joueur authentifié', () => {
    // 1. Crée un utilisateur unique
    const user = {
      pseudo: `testuser_${Date.now()}`,
      email: `testuser_${Date.now()}@example.com`,
      password: 'password123'
    };
    cy.request('POST', 'http://localhost:3001/users', user).then(() => {
      // 2. Login pour obtenir le token
      cy.request('POST', 'http://localhost:3001/auth/login', {
        pseudo: user.pseudo,
        password: user.password
      }).then((loginRes) => {
        const token = loginRes.body.access_token;
        // 3. Récupère une table
        cy.request('GET', 'http://localhost:3001/tables').then((tablesRes) => {
          const tableId = tablesRes.body[0].id;
          // 4. Join la table
          cy.request({
            method: 'POST',
            url: `http://localhost:3001/tables/${tableId}`,
            body: { action: 'join' },
            headers: { Authorization: `Bearer ${token}` }
          }).then(() => {
            // 5. Effectue une action de jeu (fold)
            cy.request({
              method: 'POST',
              url: `http://localhost:3001/tables/${tableId}`,
              body: { action: 'fold' },
              headers: { Authorization: `Bearer ${token}` }
            }).then((actionRes) => {
              expect(actionRes.status).to.eq(200);
              expect(actionRes.body).to.have.property('success', true);
              // On peut vérifier que le joueur a bien foldé dans la table retournée
              expect(actionRes.body.table).to.exist;
              const me = actionRes.body.table.players.find(p => p.name === user.pseudo);
              expect(me).to.exist;
              expect(me.hasFolded).to.be.true;
            });
          });
        });
      });
    });
  });

  // Ajoute d'autres tests POST, etc. selon tes besoins
}); 