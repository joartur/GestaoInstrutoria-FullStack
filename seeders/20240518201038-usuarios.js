'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [
      {
        matricula: '1234567890',
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        senha: 'senha123',
        tipoUsuario: 'coordenador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '2345678901',
        nome: 'Maria Souza',
        email: 'maria.souza@example.com',
        senha: 'senha123',
        tipoUsuario: 'instrutor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '3456789012',
        nome: 'Carlos Pereira',
        email: 'carlos.pereira@example.com',
        senha: 'senha123',
        tipoUsuario: 'administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '4567890123',
        nome: 'Ana Oliveira',
        email: 'ana.oliveira@example.com',
        senha: 'senha123',
        tipoUsuario: 'superUser',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '5678901234',
        nome: 'Bruno Costa',
        email: 'bruno.costa@example.com',
        senha: 'senha123',
        tipoUsuario: 'coordenador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '6789012345',
        nome: 'Carla Nunes',
        email: 'carla.nunes@example.com',
        senha: 'senha123',
        tipoUsuario: 'instrutor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '7890123456',
        nome: 'Daniel Lima',
        email: 'daniel.lima@example.com',
        senha: 'senha123',
        tipoUsuario: 'administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '8901234567',
        nome: 'Elisa Gomes',
        email: 'elisa.gomes@example.com',
        senha: 'senha123',
        tipoUsuario: 'superUser',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '9012345678',
        nome: 'Fabio Rocha',
        email: 'fabio.rocha@example.com',
        senha: 'senha123',
        tipoUsuario: 'coordenador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '0123456789',
        nome: 'Gabriela Martins',
        email: 'gabriela.martins@example.com',
        senha: 'senha123',
        tipoUsuario: 'instrutor',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
