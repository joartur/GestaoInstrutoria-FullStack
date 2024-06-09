describe('Testes de Coordenador validar serviços para instrutor', () => {
    it('Validar um registro', () => {
        //Acessa o site.
        cy.visit('http://localhost:3000/')
        //Procura a tag TD que informa que há registros pendentes e clica.
        cy.get('td.status-sphere-td').first().find('a').click();
        //URL precisa conter "/Validate".
        cy.url().should('include', '/validate/');
        //Encontra o botão de validar serviço e clica.
        cy.get('a[title="VALIDAR SERVIÇO EDUCACIONAL"]').first().click();
        //Encontra o botão de confirmar validação.
        cy.get('button.confirm-btn').click();
        //Garante que o modal de confirmação foi aberto
        cy.get('.confirmationModal-container h2').should('have.text', 'Confirmação');
    })

    it('Recusar um registro', () => {
        //Acessa o site.
        cy.visit('http://localhost:3000/')
        //Procura a tag TD que informa que há registros pendentes e clica.
        cy.get('td.status-sphere-td').first().find('a').click();
        //URL precisa conter "/Validate".
        cy.url().should('include', '/validate/');
        //Encontra o botão de rejeitar serviço e clica.
        cy.get('a[title="REJEITAR SERVIÇO EDUCACIONAL"]').first().click();
        // Insere o número 0 no input de total de horas
        cy.get('input#totalHoras').type('0');
         // Insere o texto na área de justificativa
        cy.get('textarea#justificativa').type('material insuficiente');
        // Clica no botão de validação
        cy.get('button.partialValidation-btn').click(); 
        //Garante que o modal de confirmação foi aberto
        cy.get('.confirmationModal-container h2').should('have.text', 'Confirmação');
    });
});