'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Instrutors', {
      matricula: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      unidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false
      },
      horasMinimas: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      horasTrabalhadas: {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: '00:00'
      },
      bancoHoras: {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: '00:00'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Instrutors');
  }
};
