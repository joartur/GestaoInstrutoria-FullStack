'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Registros', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      dataServico: {
        type: Sequelize.DATEONLY,
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
        type: Sequelize.STRING(50),
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true
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
      FKinstrutor: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Usuarios', // Nome da tabela de usuarios
          key: 'matricula'
        }
      },
      FKservico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Servicos', // Nome da tabela de servicos
          key: 'id'
        }
      },
      FKcoordenador: {
        type: Sequelize.STRING,
        allowNull: true,
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Registros');
  }
};
