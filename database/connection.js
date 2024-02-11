const Sequelize = require('sequelize');
//nome do banco, nome do usuário, senha, tipo de banco, host.
const sequelize = new Sequelize('instrutoriacase', 'root', 'usbw', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;