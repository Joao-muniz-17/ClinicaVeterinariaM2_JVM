const express = require('express');
const routes = require('./src/routes/index.route');
const { logger, errorHandler } = require('./src/middlewares/main.middleware');

const app = express();

// Middlewares de Infraestrutura (Rodam sempre, até para rotas que não existem)
app.use(express.json());
app.use(logger);

// Aciona o Roteador (que já vem com Auth e Content-Type embutidos)
app.use(routes);

// O Handler de Erros deve ser o último de tudo
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`[SERVIDOR] Ralph & Teddy operando em http://localhost:${PORT}`);
});
