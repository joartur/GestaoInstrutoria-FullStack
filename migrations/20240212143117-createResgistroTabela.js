'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Registros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      dataServico: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      horaInicio: {
        allowNull: false,
        type: Sequelize.TIME
      },
      horaFinal: {
        allowNull: false,
        type: Sequelize.TIME
      },
      total: {
        allowNull: false,
        type: Sequelize.TIME
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descricao: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      situacao: {
        allowNull: false,
        type: Sequelize.ENUM('Em análise', 'Validado', 'Rejeitado', 'Parcialmente Validado'),
        defaultValue: 'Em análise'
      },
      justificativa: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      servicoId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Servicos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      instrutorId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Instrutores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      coordenadorId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'CoordenadoresArea',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
