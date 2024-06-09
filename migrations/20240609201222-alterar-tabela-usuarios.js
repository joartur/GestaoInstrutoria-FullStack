'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Usuarios', 'senha', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.removeColumn('Usuarios', 'createdAt');
    await queryInterface.removeColumn('Usuarios', 'updatedAt');

    await queryInterface.addColumn('Usuarios', 'data_cadastro', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Usuarios', 'senha', {
      type: Sequelize.STRING(20),
      allowNull: false
    });

    await queryInterface.addColumn('Usuarios', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });

    await queryInterface.addColumn('Usuarios', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });

    await queryInterface.removeColumn('Usuarios', 'data_cadastro');
  }
};
