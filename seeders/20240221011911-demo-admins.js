'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('administrativos',[
      {
        matricula: '123456',
        nome: 'Fernanda Silva',
        email: 'fernanda.silva@example.com'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remover os dados inseridos
    await queryInterface.bulkDelete('administrativos', null, {});
  }
};
