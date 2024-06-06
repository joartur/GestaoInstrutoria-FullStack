describe('Testes de Coordenador validar serviços para instrutor', () => {
    it('Validar um registro', () => {
        cy.visit('http://localhost:3000/')

        cy.get('td.status-sphere-td').first() 
        .find('a')
        .click();

        cy.url().should('include', '/validate/');

        cy.get('td')
        .find('td')
        .click();
    })
});