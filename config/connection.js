const { Sequelize } = require('sequelize');
// Carregar configuração do banco de dados
const dbConfig = require('./config');

// Inicializar Sequelize
const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV]);

module.exports= sequelize;