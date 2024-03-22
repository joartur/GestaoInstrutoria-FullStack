'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Registros',[
      {
        dataServico: '2024-03-01',
        horaInicio: '09:00:00',
        horaFinal: '12:00:00',
        total: '03:00:00',
        titulo: 'Workshop de Maquiagem',
        descricao: 'Workshop prático de técnicas de maquiagem.',
        status: 'Em Análise',
        FKinstrutor: '123456',
        FKservico: 2, // Palestra
        FKcoordenador: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dataServico: '2024-02-15',
        horaInicio: '14:00:00',
        horaFinal: '16:00:00',
        total: '02:00:00',
        titulo: 'Aula de Programação Web',
        descricao: 'Aula teórica e prática sobre desenvolvimento web.',
        status: 'Validado',
        FKinstrutor: '345678',
        FKservico: 4, // Aula Online
        FKcoordenador: '758690',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dataServico: '2024-02-20',
        horaInicio: '19:00:00',
        horaFinal: '21:00:00',
        total: '02:00:00',
        titulo: 'Degustação de Pratos Típicos',
        descricao: 'Evento de degustação de pratos típicos da região.',
        status: 'Recusado',
        justificativa: 'Evento não se enquadra nos critérios da instituição.',
        FKinstrutor: '789012',
        FKservico: 2, // Palestra
        FKcoordenador: '019283',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dataServico:'2024-03-05',
        horaInicio: '10:00:00',
        horaFinal: '11:30:00',
        total: '01:00:00',
        titulo: 'Consultoria em Turismo Sustentável',
        descricao: 'Consultoria sobre práticas de turismo sustentável.',
        status: 'Parcialmente Validado',
        justificativa: 'Algumas partes do conteúdo precisam ser revistas.',
        FKinstrutor: '901234',
        FKservico: 1, // Consultoria
        FKcoordenador: '647382',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Registros', null, {});
  }
};
