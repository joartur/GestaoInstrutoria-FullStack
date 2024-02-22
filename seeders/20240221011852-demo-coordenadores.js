'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CoordenadorAreas',[
      {
        matricula: '789012',
        nome: 'Pedro Santos',
        email: 'pedro.santos@example.com',
        area: 'Estética'
      },
      {
        matricula: '123456',
        nome: 'Ana Oliveira',
        email: 'ana.oliveira@example.com',
        area: 'Gastronomia'
      },
      {
        matricula: '345678',
        nome: 'Mariana Silva',
        email: 'mariana.silva@example.com',
        area: 'Tecnologia'
      },
      {
        matricula: '901234',
        nome: 'Carlos Sousa',
        email: 'carlos.sousa@example.com',
        area: 'Turismo'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remover os dados inseridos
    await queryInterface.bulkDelete('CoordenadorAreas', null, {});
  }
};
