'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Instrutors', [
      {
        FKinstrutor: '2345',
        horasMinimas: '00:00:00',
        horasTrabalhadasPeriodo: '00:00:00',
        saldoHoras: '00:00:00',
        unidadeSenac: 'Alecrim',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FKinstrutor: '6789',
        horasMinimas: '00:00:00',
        horasTrabalhadasPeriodo: '00:00:00',
        saldoHoras: '00:00:00',
        unidadeSenac: 'Centro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FKinstrutor: '0123',
        horasMinimas: '00:00:00',
        horasTrabalhadasPeriodo: '00:00:00',
        saldoHoras: '00:00:00',
        unidadeSenac: 'Zona Norte',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Instrutors', null, {});
  }
};
