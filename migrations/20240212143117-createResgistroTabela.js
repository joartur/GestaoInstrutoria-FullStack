'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Registros', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
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
      situacao: {
        type: Sequelize.ENUM('Em análise', 'Validado', 'Rejeitado', 'Parcialmente Validado'),
        defaultValue: 'Em análise',
        allowNull: false
      },
      justificativa: {
        type: Sequelize.TEXT,
        allowNull: true // Pode ser nulo, dependendo da situação
      },
      servicoId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Servicos',
          key: 'id'
        }
      },
      instrutorId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Instrutors',
          key: 'matricula'
        }
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
    await queryInterface.dropTable('Registros');
  }
};
