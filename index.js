const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const app = express();
const port = 3000;

// Carregar configuração do banco de dados
const dbConfig = require('./config/config.json');

// Inicializar Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql', // Use diretamente o valor 'mysql' como dialeto
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Inicialização do Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync(); // Sincroniza os modelos com o banco de dados
  })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar e sincronizar tabelas:', error);
  });

// Rotas
app.get('/', (req, res) => {
  res.send('Olá, eu serei útil em algum momento!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
