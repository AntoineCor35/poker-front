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

  // Ajoute d'autres tests POST, etc. selon tes besoins
}); 