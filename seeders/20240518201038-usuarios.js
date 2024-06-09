'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [
      {
        matricula: '1234',
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        senha: 'senha123',
        tipoUsuario: 'coordenador',
        data_cadastro: new Date()
      },
      {
        matricula: '2345',
        nome: 'Maria Souza',
        email: 'maria.souza@example.com',
        senha: 'senha123',
        tipoUsuario: 'instrutor',
        data_cadastro: new Date()
      },
      {
        matricula: '3456',
        nome: 'Carlos Pereira',
        email: 'carlos.pereira@example.com',
        senha: 'senha123',
        tipoUsuario: 'administrador',
        data_cadastro: new Date()
      },
      {
        matricula: '4567',
        nome: 'Ana Oliveira',
        email: 'ana.oliveira@example.com',
        senha: 'senha123',
        tipoUsuario: 'superUser',
        data_cadastro: new Date()
      },
      {
        matricula: '5678',
        nome: 'Bruno Costa',
        email: 'bruno.costa@example.com',
        senha: 'senha123',
        tipoUsuario: 'coordenador',
        data_cadastro: new Date()
      },
      {
        matricula: '6789',
        nome: 'Carla Nunes',
        email: 'carla.nunes@example.com',
        senha: 'senha123',
        tipoUsuario: 'instrutor',
        data_cadastro: new Date()
      },
      {
        matricula: '7890',
        nome: 'Daniel Lima',
        email: 'daniel.lima@example.com',
        senha: 'senha123',
        tipoUsuario: 'administrador',
        data_cadastro: new Date()
      },
      {
        matricula: '8901',
        nome: 'Elisa Gomes',
        email: 'elisa.gomes@example.com',
        senha: 'senha123',
        tipoUsuario: 'superUser',
        data_cadastro: new Date()
      },
      {
        matricula: '9012',
        nome: 'Fabio Rocha',
        email: 'fabio.rocha@example.com',
        senha: 'senha123',
        tipoUsuario: 'coordenador',
        data_cadastro: new Date()
      },
      {
        matricula: '0123',
        nome: 'Gabriela Martins',
        email: 'gabriela.martins@example.com',
        senha: 'senha123',
        tipoUsuario: 'instrutor',
        data_cadastro: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
