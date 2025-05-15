/// <reference types="cypress" />

describe('E2E UI - Parcours complet utilisateur (front + back)', () => {
  const user = {
    pseudo: `e2eui_${Date.now()}`,
    email: `e2eui_${Date.now()}@example.com`,
    password: 'password123'
  };

  before(() => {
    // Crée l'utilisateur via l'API
    cy.request('POST', 'http://localhost:3001/users', user);
  });

  it('Se connecte, rejoint une table et vérifie l\'UI', () => {
    // 1. Va sur la page de login
    cy.visit('/login');
    cy.get('input[name="pseudo"]').type(user.pseudo);
    cy.get('input[name="password"]').type(user.password);
    cy.get('form').submit();

    // 2. Vérifie qu'on est connecté (présence du pseudo ou d'un élément du header)
    cy.contains(user.pseudo).should('exist');

    // 3. Va sur la page des tables
    cy.contains('a', 'TABLES', { matchCase: false }).click();
    cy.contains('h1', 'Tables disponibles').should('be.visible');

    // 4. Clique sur rejoindre la première table
    cy.get('button').contains('Rejoindre').should('exist').first().click();

    // 5. Vérifie qu'on est bien sur la page de la table et que les infos clés sont présentes
    cy.url().should('match', /\/tables\/[\w\d]+/);
    cy.get('h2').should('exist'); // nom de la table
    cy.contains(/pot/i).should('exist');
    cy.contains(/journal de la partie/i).should('exist');
    cy.contains(/blindes/i).should('exist');

    // 6. Vérifie que le pseudo du joueur est affiché dans la liste des joueurs
    cy.contains(user.pseudo).should('exist');
  });
}); 