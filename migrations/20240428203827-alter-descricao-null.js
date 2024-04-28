'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('registros', 'descricao', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    //revertendo as alterações feitas anteriormente
    await queryInterface.changeColumn('registros', 'descricao', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  }
};
