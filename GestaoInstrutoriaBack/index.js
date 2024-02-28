const express = require('express');
const cors = require('cors');
const sequelize = require('./database/connection.js');
const servicoRouter = require('./routes/servicoRoutes');
const instrutorRouter = require('./routes/instrutorRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/servico', servicoRouter);
app.use('/instrutor', instrutorRouter);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({ error: err.message });
});

// Função assíncrona para autenticar o Sequelize e sincronizar as tabelas
async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await sequelize.sync();
    console.log('Tabelas sincronizadas com sucesso.');
    // Inicia o servidor após a sincronização das tabelas
    app.listen(port, () => {
      console.log(`Aplicação rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar e sincronizar tabelas:', error);
    process.exit(1); // Encerra o processo em caso de erro
  }
}

// Chama a função para iniciar o servidor
iniciarServidor();
