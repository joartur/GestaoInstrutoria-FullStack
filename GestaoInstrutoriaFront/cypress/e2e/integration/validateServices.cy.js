describe('Testes de Coordenador validar serviços para instrutor', () => {
    it('Validar um registro', () => {
        cy.visit('http://localhost:3000/')

        cy.get('td.status-sphere-td').first() .find('a').click();

        cy.url().should('include', '/validate/');

        cy.get('a[title="VALIDAR SERVIÇO EDUCACIONAL"]').click();

        cy.get('button.confirm-btn').click();

        cy.get('h2').should('have.text', 'confirmação');        
    })
});