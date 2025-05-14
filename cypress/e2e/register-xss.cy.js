// Test d'injection XSS via le formulaire d'inscription

describe('Sécurité XSS - Formulaire d\'inscription', () => {
  it('devrait empêcher l\'injection XSS via le formulaire d\'inscription', () => {
    const xssPseudo = "<script>alert('xss')</script>";
    const email = `xssfront_${Date.now()}@example.com`;
    const password = 'password123';

    cy.visit('/register'); // adapte l'URL si besoin

    cy.get('input[name="pseudo"]').type(xssPseudo);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('form').submit();

    // Selon le comportement attendu :
    // 1. L'inscription doit échouer (message d'erreur affiché)
    cy.contains('erreur').should('exist'); // adapte le texte selon ton UI

    // 2. OU, si l'inscription passe, le pseudo affiché ne doit pas contenir le code brut
    cy.contains(xssPseudo).should('not.exist');
    cy.contains('<script>').should('not.exist');
  });

  it('affiche une erreur si le pseudo est trop long ou contient une payload XSS', () => {
    const xssPseudo = "<script>alert('xss')</script>";
    const email = `xssfront_${Date.now()}@example.com`;
    const password = 'Password123';

    cy.visit('/register');

    cy.get('input[name="pseudo"]').type(xssPseudo);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);

    // Vérifie que le message d'erreur de longueur s'affiche
    cy.contains('Le pseudo ne doit pas dépasser 20 caractères').should('exist');

    // On tente de soumettre quand même
    cy.get('button[type="submit"]').click();

    // Le message de succès ne doit pas apparaître
    cy.contains('Inscription réussie').should('not.exist');
  });
}); 