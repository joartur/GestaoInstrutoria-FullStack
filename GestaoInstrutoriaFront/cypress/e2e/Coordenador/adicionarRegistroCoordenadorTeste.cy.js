describe('Testes de Coordenador adicionar serviço educacional para instrutor', () => {
    it('Adicionar Serviço Educacional para Instrutor', () => {
        //Acessa o site.
        cy.visit('http://localhost:3000/');
        //Encontra o botão de adicionar registro para instrutor.
        cy.contains('Adicionar Registro', { timeout: 10000 }, { force: true }).should('be.visible').click();
        //Preenche campo Título
        cy.get('#titulo').type('Palestra sobre Criatividade', { timeout: 10000 }, { force: true });
        // Preenche o campo Data do Serviço
        cy.get('#dataServico').type('2024-05-20', { timeout: 10000 }, { force: true });
        // Preenche o campo Hora de Início
        cy.get('#horaInicio').type('09:00', { timeout: 10000 }, { force: true });
        // Preenche o campo Hora Final
        cy.get('#horaFinal').type('12:00', { timeout: 10000 }, { force: true });
        // Seleciona uma opção no campo Tipo de Serviço
        cy.get('#FKservico').select('Eventos', { timeout: 10000 }, { force: true });
        // Preenche o campo Descrição do Serviço
        cy.get('#descricao').type('Apresentei a palestra sobre criatividade no auditório do Senac RN, exemplifiquei técnicas práticas para estimular a imaginação no ambiente de trabalho.', { timeout: 10000 }, { force: true });
        // Clica no botão Enviar
        cy.get('button[type="submit"].main-btn.medium').contains('Enviar').click();
        //Garante que o modal de confirmação foi aberto
        cy.get('.confirmationModal-container h2').should('have.text', 'Confirmação');
    })
});
