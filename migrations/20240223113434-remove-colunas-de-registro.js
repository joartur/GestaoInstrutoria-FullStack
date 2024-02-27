'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('registros', 'dataCriacao');
    await queryInterface.removeColumn('registros', 'dataAtualizacao');
  },

  down: async (queryInterface, Sequelize) => {
  }
};