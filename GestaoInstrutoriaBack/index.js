import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { authenticate, sync } from './config/connection.js';
import servicoRouter from './modules/administrador/routes/servicoRoutes.js';
import coordAreaRouter from './modules/coordenador/routes/coordAreaRoutes.js';
import instrutorRouter from './modules/instrutor/routes/instrutorRoutes.js';
import swaggerDoc from './swagger.json';

// Importando métricas
import { register, httpRequestDurationMicroseconds } from './metrics';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

// Endpoint de métricas para Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Middleware para medir a duração de requisições HTTP
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ route: req.path, code: res.statusCode, method: req.method });
  });
  next();
});

// Rotas
app.use('/servico', servicoRouter);
app.use('/instrutor', instrutorRouter);
app.use('/coordArea', coordAreaRouter);

// Swagger UI
app.use('/api-docs', serve, setup(swaggerDoc));

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({ error: err.message });
});

// Função assíncrona para autenticar o Sequelize e sincronizar as tabelas
async function iniciarServidor() {
  try {
    await authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await sync();
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