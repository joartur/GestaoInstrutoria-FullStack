'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Servicos', 'nome', {
      type: Sequelize.STRING(80),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Servicos', 'nome', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
