'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuarios', {
      matricula: {
        type: Sequelize.STRING(15),
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      tipoUsuario: {
        type: Sequelize.ENUM('coordenador', 'instrutor', 'administrador', 'superUser'),
        allowNull: false
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
    await queryInterface.dropTable('Usuarios');
  }
};
