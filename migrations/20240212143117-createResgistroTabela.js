'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('registrosEducacionais', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        allowNull: true // Pode ser nulo, dependendo da situação
      },
      dataCriacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dataAtualizacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      FKinstrutor: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'instrutores',
            key: 'matricula'
        }
      },
      FKservico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'servicosEducacionais',
            key: 'id'
        }
      },
      FKcoordenador: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: 'coordenadoresArea',
            key: 'matricula'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('registrosEducacionais');
  }
};
