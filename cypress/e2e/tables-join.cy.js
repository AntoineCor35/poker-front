/// <reference types="cypress" />

function uniqueUser() {
  const id = Date.now();
  return {
    pseudo: `testuser_${id}`,
    email: `testuser_${id}@example.com`,
    password: 'password123',
  };
}

describe('Rejoindre une table - Utilisateur non connecté', () => {
  it('redirige vers /register si non connecté', () => {
    cy.visit('/');
    cy.contains('a', 'TABLES', { matchCase: false }).click();
    cy.contains('h1', 'Tables disponibles').should('be.visible');
    cy.get('button').contains('Rejoindre').should('exist').first().click();
    cy.url().should('include', '/register');
    cy.get('form').should('exist');
    cy.contains('button', "S'inscrire", { matchCase: false }).should('exist');
  });
});

describe('Rejoindre une table - Utilisateur connecté', () => {
  const user = {
    pseudo: 'cypress_user',
    email: 'cypress_user@example.com',
    password: 'password123',
  };
  before(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/users',
      body: user,
      failOnStatusCode: false
    });
  });

  it('rejoint une table et accède à la page de la table', () => {
    cy.loginByApi(user.pseudo, user.password);
    cy.visit('/');
    cy.contains('a', 'TABLES', { matchCase: false }).click();
    cy.contains('h1', 'Tables disponibles').should('be.visible');
    cy.get('button').contains('Rejoindre').should('exist').first().click();
    cy.url().should('match', /\/tables\/[\w\d]+/);
    cy.get('h2').should('exist');
    cy.contains(/pot/i).should('exist');
    cy.contains(/journal de la partie/i).should('exist');
    cy.contains(/blindes/i).should('exist');
  });
}); 