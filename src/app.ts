import express from 'express';
import { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import empresasRoutes from './routes/empresas.routes';
import campanhasRoutes from './routes/campanhas.routes';
import tecnicosRoutes from './routes/tecnicos.routes';
import produtoresRoutes from './routes/produtores.routes';

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors());

// Middleware de parsing JSON
app.use(json());

// Middleware de validação de JSON
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  next();
});

// Rotas
app.use('/empresas', empresasRoutes);
app.use('/campanhas', campanhasRoutes);
app.use('/tecnicos', tecnicosRoutes);
app.use('/produtores', produtoresRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Middleware de tratamento global de erros
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Erro:', err);
  
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  
  res.status(status).json({ 
    error: message,
    timestamp: new Date().toISOString()
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

export default app;
