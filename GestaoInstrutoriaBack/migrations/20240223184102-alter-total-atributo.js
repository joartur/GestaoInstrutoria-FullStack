'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('registros', 'total', {
            type: Sequelize.INTEGER,
            allowNull: false
        });
    },

    down: async (queryInterface, Sequelize) => {
        // No método down, você pode reverter a alteração, se necessário.
        // Por exemplo, se quiser voltar o tipo de dados para o que era antes.
        // Se isso não for necessário, você pode deixar este método vazio.
    }
};
