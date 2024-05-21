'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Dados das áreas a serem inseridos
    const areasData = [
      { nome: 'Tecnologia' },
      { nome: 'Marketing' },
      { nome: 'Turismo' },
      { nome: 'Finanças' }
    ];

    // Inserir os dados na tabela Areas
    await queryInterface.bulkInsert('Areas', areasData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remover os registros inseridos na tabela Areas
    await queryInterface.bulkDelete('Areas', null, {});
  }
};
