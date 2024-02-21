'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('instrutores', {
      matricula: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
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
        type: Sequelize.TIME,
        allowNull: false
      },
      horasTrabalhadas: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00'
      },
      saldoHoras: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00'
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
    await queryInterface.dropTable('instrutores');
  }
};
