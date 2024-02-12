'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Instrutors', [
      {
        nome: 'João',
        email: 'joao@example.com',
        unidade: 'Unidade A',
        area: 'Área X',
        horasMinimas: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Maria',
        email: 'maria@example.com',
        unidade: 'Unidade B',
        area: 'Área Y',
        horasMinimas: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'João Silva',
        email: 'joao@example.com',
        unidade: 'Unidade A',
        area: 'Área W',
        horasMinimas: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Maria Oliveira',
        email: 'maria@example.com',
        unidade: 'Unidade B',
        area: 'Área Y',
        horasMinimas: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Pedro Santos',
        email: 'pedro@example.com',
        unidade: 'Unidade C',
        area: 'Área X',
        horasMinimas: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Instrutors', null, {});
  }
};

// use o comando 'npx sequelize-cli db:seed:all' para adicionar os dados
// use o comando 'npx sequelize-cli db:seed:undo:all' para excluir TODOS os dados