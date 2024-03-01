'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('CoordenadorAreas', 'nome', {
      type: Sequelize.STRING(100),
      allowNull: false
    });

    await queryInterface.changeColumn('CoordenadorAreas', 'email', {
      type: Sequelize.STRING(80),
      allowNull: false
    });

    await queryInterface.changeColumn('CoordenadorAreas', 'area', {
      type: Sequelize.STRING(30),
      allowNull: false
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('CoordenadorAreas', 'nome', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('CoordenadorAreas', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('CoordenadorAreas', 'area', {
      type: Sequelize.STRING,
      allowNull: false
    });

  }
};
