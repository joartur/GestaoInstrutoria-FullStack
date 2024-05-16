'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserção dos dados na tabela
    await queryInterface.bulkInsert('CoordenadorAreas', [
      {
        matricula: '123456',
        nome: 'Fulano da Silva',
        email: 'fulano@example.com',
        senha: 'senha1',
        area: 'Estética',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '019283',
        nome: 'Ciclano Oliveira',
        email: 'ciclano@example.com',
        senha: 'senha1',
        area: 'Gastronomia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '758690',
        nome: 'Maria João Melo',
        email: 'MjM@example.com',
        senha: 'senha1',
        area: 'Tecnologia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '647382',
        nome: 'Lucas Machado Azevedo',
        email: 'lu.Machado@example.com',
        senha: 'senha1',
        area: 'Turismo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remoção dos dados inseridos na tabela
    await queryInterface.bulkDelete('CoordenadorAreas', null, {});
  }
};
