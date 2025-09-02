import express from 'express';

const app = express();

// Teste simples de rotas
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route' });
});

app.listen(3000, () => {
  console.log('Test server running on port 3000');
});
