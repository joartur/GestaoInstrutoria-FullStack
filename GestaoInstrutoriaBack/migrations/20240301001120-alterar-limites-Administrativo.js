'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Administrativos', 'nome', {
      type: Sequelize.STRING(100),
      allowNull: false
    });

    await queryInterface.changeColumn('Administrativos', 'email', {
      type: Sequelize.STRING(80),
      allowNull: false
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Administrativos', 'nome', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Administrativos', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
  }
};
