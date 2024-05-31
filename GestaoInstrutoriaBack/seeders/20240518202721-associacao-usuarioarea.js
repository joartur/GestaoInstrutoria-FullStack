'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UsuarioAreas', [
      {
        UsuarioMatricula: '1234567890',
        AreaId: 1, // Assume-se que 'Tecnologia' tem ID 1 
      },
      {
        UsuarioMatricula: '2345678901',
        AreaId: 1,
      },
      {
        UsuarioMatricula: '5678901234',
        AreaId: 2, // Assume-se que 'Marketing' tem ID 2
      },
      {
        UsuarioMatricula: '6789012345',
        AreaId: 1, 
      },
      {
        UsuarioMatricula: '9012345678',
        AreaId: 3, 
      },
      {
        UsuarioMatricula: '0123456789',
        AreaId: 3, 
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UsuarioAreas', null, {});
  }
};
