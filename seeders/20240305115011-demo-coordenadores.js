'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criação dos dados a serem inseridos na tabela
    const coordenadores = [
      {
        matricula: '123456',
        nome: 'Fulano da Silva',
        email: 'fulano@example.com',
        area: 'Estética'
      },
      {
        matricula: '789012',
        nome: 'Ciclano Oliveira',
        email: 'ciclano@example.com',
        area: 'Gastronomia'
      },
      {
        matricula: '345678',
        nome: 'Maria João Melo',
        email: 'MjM@example.com',
        area: 'Tecnologia'
      },
      {
        matricula: '901234',
        nome: 'Lucas Machado Azevedo',
        email: 'lu.Machado@example.com',
        area: 'Turismo'
      },
    
    ];

    // Inserção dos dados na tabela
    await queryInterface.bulkInsert('CoordenadorAreas', coordenadores, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remoção dos dados inseridos na tabela
    await queryInterface.bulkDelete('CoordenadorAreas', null, {});
  }
};
