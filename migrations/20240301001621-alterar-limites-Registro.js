'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('registros', 'titulo', {
      type: Sequelize.STRING(50), // Alterando o limite de caracteres para 50
      allowNull: false
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('registros', 'titulo', {
      type: Sequelize.STRING, // Alterando o limite de caracteres para 50
      allowNull: false
    });

  }
};
