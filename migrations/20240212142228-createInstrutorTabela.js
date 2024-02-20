'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Instrutores', {
      matricula: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true, // Define o atributo como único
        type: Sequelize.STRING
      },
      unidade: {
        allowNull: false,
        type: Sequelize.STRING
      },
      area: {
        allowNull: false,
        type: Sequelize.STRING
      },
      horasMinimas: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      horasTrabalhadas: {
        allowNull: false,
        type: Sequelize.TIME,
        defaultValue: '00:00'
      },
      bancoHoras: {
        allowNull: false,
        type: Sequelize.TIME,
        defaultValue: '00:00'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Instrutores');
  }
};
