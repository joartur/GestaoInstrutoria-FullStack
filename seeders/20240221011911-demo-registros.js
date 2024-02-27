'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Registros',[
        {
          dataServico: '2024-02-17',
          horaInicio: '08:00:00',
          horaFinal: '12:00:00',
          total: '04:00:00',
          titulo: 'Aula de Matemática',
          descricao: 'Aula de reforço para alunos do ensino médio.',
          FKinstrutor: '123456',
          FKservico: 2
        },
        {
          dataServico: '2024-02-18',
          horaInicio: '09:00:00',
          horaFinal: '11:00:00',
          total: '02:00:00',
          titulo: 'Atendimento aos Estudantes',
          descricao: 'Esclarecimento de dúvidas sobre matrículas.',
          FKinstrutor: '789012',
          FKservico: 2
        },
        {
          dataServico: '2024-02-19',
          horaInicio: '14:00:00',
          horaFinal: '17:00:00',
          total: '03:00:00',
          titulo: 'Uso do Laboratório de Informática',
          descricao: 'Estudantes realizando práticas de programação.',
          FKinstrutor: '345678',
          FKservico: 4
        },
        {
          dataServico: '2024-02-20',
          horaInicio: '10:30:00',
          horaFinal: '12:30:00',
          total: '02:00:00',
          titulo: 'Aula de Química',
          descricao: 'Demonstração de experimentos para alunos do ensino fundamental.',
          FKinstrutor: '901234',
          FKservico: 3
        },
        {
          dataServico: '2024-02-21',
          horaInicio: '13:00:00',
          horaFinal: '15:00:00',
          total: '02:00:00',
          titulo: 'Atividade na Biblioteca',
          descricao: 'Sessão de leitura para incentivar o hábito de leitura.',
          FKinstrutor: '123456',
          FKservico: 5
        },
        {
          dataServico: '2024-02-22',
          horaInicio: '08:30:00',
          horaFinal: '10:30:00',
          total: '02:00:00',
          titulo: 'Atendimento aos Pais',
          descricao: 'Reunião para discutir o progresso dos alunos.',
          FKinstrutor: '789012',
          FKservico: 2
        },
        {
          dataServico: '2024-02-23',
          horaInicio: '09:00:00',
          horaFinal: '11:00:00',
          total: '02:00:00',
          titulo: 'Aula de Física',
          descricao: 'Discussão sobre leis do movimento.',
          FKinstrutor: '345678',
          FKservico: 3
        },
        {
          dataServico: '2024-02-24',
          horaInicio: '14:00:00',
          horaFinal: '16:00:00',
          total: '02:00:00',
          titulo: 'Projeto de Ciências',
          descricao: 'Apresentação de projetos científicos dos alunos.',
          FKinstrutor: '901234',
          FKservico: 3
        },
        {
          dataServico: '2024-02-25',
          horaInicio: '10:00:00',
          horaFinal: '12:00:00',
          total: '02:00:00',
          titulo: 'Atividade na Cantina',
          descricao: 'Degustação de alimentos saudáveis.',
          FKinstrutor: '123456',
          FKservico: 4
        },
        {
          dataServico: '2024-02-26',
          horaInicio: '13:30:00',
          horaFinal: '15:30:00',
          total: '02:00:00',
          titulo: 'Visita ao Museu',
          descricao: 'Estudantes aprendendo sobre história local.',
          FKinstrutor: '789012',
          FKservico: 3
        },
        {
          dataServico: '2024-03-10',
          horaInicio: '14:00:00',
          horaFinal: '17:00:00',
          total: '03:00:00',
          titulo: 'Uso do Laboratório de Informática',
          descricao: 'Estudantes realizando práticas de programação.',
          FKinstrutor: '345678',
          FKservico: 4
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remover todos os registros inseridos
    return queryInterface.bulkDelete('Registros', null, {});
  }
};