const client = require('prom-client');

// Registro global do prom-client
const register = new client.Registry();

// Colete métricas padrão (como uso de memória, CPU, etc.)
client.collectDefaultMetrics({ register });

// Exemplo de métrica personalizada - Duração de Requisições HTTP
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duração de requisições HTTP em ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500]
});

register.registerMetric(httpRequestDurationMicroseconds);

// Exportando as métricas registradas
module.exports = {
  register,
  httpRequestDurationMicroseconds
};