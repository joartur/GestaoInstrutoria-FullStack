'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criação da tabela Areas
    await queryInterface.createTable('Areas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING(60),
        allowNull: false
      }
    });

    // Criação da tabela associativa UsuarioArea
    await queryInterface.createTable('UsuarioAreas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      usuarioMatricula: {
        type: Sequelize.STRING(15),
        allowNull: false,
        references: {
          model: 'Usuarios', // Nome da tabela de usuarios
          key: 'matricula'
        }
      },
      areaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Areas', // Nome da tabela de areas
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remover a tabela associativa primeiro
    await queryInterface.dropTable('UsuarioAreas');

    // Remover a tabela Areas
    await queryInterface.dropTable('Areas');
  }
};
