'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserir os dados manualmente na tabela Instrutor
    await queryInterface.bulkInsert('Instrutors', [
      {
        FKinstrutor: '2345678901',
        horasMinimas: '00:00:00',
        horasTrabalhadasPeriodo: '00:00:00',
        saldoHoras: '00:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FKinstrutor: '6789012345',
        horasMinimas: '00:00:00',
        horasTrabalhadasPeriodo: '00:00:00',
        saldoHoras: '00:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FKinstrutor: '0123456789',
        horasMinimas: '00:00:00',
        horasTrabalhadasPeriodo: '00:00:00',
        saldoHoras: '00:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Repita para cada instrutor, ajustando os índices conforme necessário
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remover os registros inseridos na tabela Instrutor
    await queryInterface.bulkDelete('Instrutors', null, {});
  }
};
