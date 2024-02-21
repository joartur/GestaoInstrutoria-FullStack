'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('servicosEducacionais', [
      {
        nome: 'Consultoria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Palestra',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Auditoria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Aula Online',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Desfazer as inserções
    return queryInterface.bulkDelete('servicosEducacionais', null, {});
  }
};
