'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UsuarioAreas', [
      {
        UsuarioMatricula: '1234',
        AreaId: 1, // Assume-se que 'Tecnologia' tem ID 1 
      },
      {
        UsuarioMatricula: '2345',
        AreaId: 1,
      },
      {
        UsuarioMatricula: '5678',
        AreaId: 2, // Assume-se que 'Marketing' tem ID 2
      },
      {
        UsuarioMatricula: '6789',
        AreaId: 1, 
      },
      {
        UsuarioMatricula: '9012',
        AreaId: 3, 
      },
      {
        UsuarioMatricula: '0123',
        AreaId: 3, 
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UsuarioAreas', null, {});
  }
};
