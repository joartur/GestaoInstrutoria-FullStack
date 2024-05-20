'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('instrutors', [
      {
        matricula: '123456',
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        senha: 'senha1', // Adicione o campo de senha
        unidade: 'Unidade Alecrim',
        area: 'Estética',
        horasMinimas: '20:00:00',
        horasTrabalhadas: '06:00:00',
        saldoHoras: '02:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '789012',
        nome: 'Maria Souza',
        email: 'maria.souza@example.com',
        senha: 'senha1', 
        unidade: 'Unidade Alecrim',
        area: 'Gastronomia',
        horasMinimas: '30:00:00',
        horasTrabalhadas: '08:00:00',
        saldoHoras: '00:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '345678',
        nome: 'Carlos Oliveira',
        email: 'carlos.oliveira@example.com',
        senha: 'senha1', 
        unidade: 'Unidade Centro',
        area: 'Tecnologia',
        horasMinimas: '10:00:00',
        horasTrabalhadas: '09:00:00',
        saldoHoras: '00:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '901234',
        nome: 'Ana Santos',
        email: 'ana.santos@example.com',
        senha: 'senha1', 
        unidade: 'Unidade Barreira Roxa',
        area: 'Turismo',
        horasMinimas: '05:00:00',
        horasTrabalhadas: '07:00:00',
        saldoHoras: '00:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('instrutors', null, {});
  }
};

// use o comando 'npx sequelize-cli db:seed:all' para adicionar os dados
// use o comando 'npx sequelize-cli db:seed:undo:all' para excluir TODOS os dados