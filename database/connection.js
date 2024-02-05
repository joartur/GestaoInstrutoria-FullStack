const Sequelize = require('sequelize');
const sequelize = new Sequelize('nome_do_banco', 'root', 'usbw', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;