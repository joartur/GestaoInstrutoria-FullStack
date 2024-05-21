'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Dados dos serviços a serem inseridos
    const servicoData = [
      { nome: 'Desenvolvimento de material de aula', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Auditoria', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Palestra', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Consultoria', createdAt: new Date(), updatedAt: new Date() }
    ];    

    // Inserir os dados na tabela Servico
    await queryInterface.bulkInsert('Servicos', servicoData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remover os registros inseridos na tabela Servico
    await queryInterface.bulkDelete('Servicos', null, {});
  }
};
