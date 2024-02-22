const sequelize = require('./database/connection.js');
const servicoRouter = require('./routes/servicoRoutes');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/servico', servicoRouter);


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

async function listarTabelas() {
  try {
    // Executa uma consulta SQL para listar todas as tabelas do banco de dados
    const tabelas = await sequelize.query("SHOW TABLES");
    
    // A resposta da consulta será um array de objetos contendo o nome das tabelas
    console.log("Tabelas do banco de dados:");
    tabelas[0].forEach(tabela => {
      console.log(tabela[`Tables_in_${sequelize.config.database}`]);
    });
  } catch (error) {
    console.error("Erro ao listar tabelas:", error);
  }
}

listarTabelas();
