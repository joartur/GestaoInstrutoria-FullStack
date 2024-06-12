'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Usuarios', 'senha', {
      type: Sequelize.STRING,
      allowNull: false
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Usuarios', 'senha', {
      type: Sequelize.STRING(20),
      allowNull: false
    });

  }
};
