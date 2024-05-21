'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('CoordenadorAreas', 'senha', {
      type: Sequelize.STRING(128),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('CoordenadorAreas', 'senha');

  }
};
