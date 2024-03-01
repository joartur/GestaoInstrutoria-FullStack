'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Instrutors', 'nome', {
      type: Sequelize.STRING(100),
      allowNull: false
    });

    await queryInterface.changeColumn('Instrutors', 'email', {
      type: Sequelize.STRING(80),
      allowNull: false
    });

    await queryInterface.changeColumn('Instrutors', 'unidade', {
      type: Sequelize.STRING(50),
      allowNull: false
    });

    await queryInterface.changeColumn('Instrutors', 'area', {
      type: Sequelize.STRING(30),
      allowNull: false
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Instrutors', 'nome', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Instrutors', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Instrutors', 'unidade', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Instrutors', 'area', {
      type: Sequelize.STRING,
      allowNull: false
    });

  }
};
