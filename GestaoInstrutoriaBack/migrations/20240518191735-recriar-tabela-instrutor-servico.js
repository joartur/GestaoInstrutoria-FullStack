'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // exclui a anterior
    await queryInterface.dropTable('Instrutors');

    // Criação da tabela Instrutors
    await queryInterface.createTable('Instrutors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      horasMinimas: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00'
      },
      horasTrabalhadasPeriodo: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00'
      },
      saldoHoras: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00'
      },
      unidadeSenac:{
        type: Sequelize.STRING(30),
        allowNull:false
      },
      FKinstrutor: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Usuarios', // Nome da tabela de usuarios
          key: 'matricula'
        }
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

    await queryInterface.createTable('Servicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(60)
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
    await queryInterface.dropTable('Instrutors');
    
    // Excluir a tabela Servicos
    await queryInterface.dropTable('Servicos');
  }
};
