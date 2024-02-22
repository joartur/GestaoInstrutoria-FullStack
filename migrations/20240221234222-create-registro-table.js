'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Registros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataServico: {
        type: Sequelize.DATE,
        allowNull: false
      },
      horaInicio: {
        type: Sequelize.TIME,
        allowNull: false
      },
      horaFinal: {
        type: Sequelize.TIME,
        allowNull: false
      },
      total: {
        type: Sequelize.TIME,
        allowNull: false
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Em Análise', 'Validado', 'Recusado', 'Parcialmente Validado'),
        defaultValue: 'Em Análise',
        allowNull: false
      },
      justificativa: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dataCriacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dataAtualizacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      FKinstrutor: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Instrutors',
          key: 'matricula'
        }
      },
      FKservico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Servicos',
          key: 'id'
        }
      },
      FKcoordenador: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'CoordenadorAreas',
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Registros');
  }
};
