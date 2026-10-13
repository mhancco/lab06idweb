// app.js - Laboratorio 06: API RESTful de Cursos con Express
const express = require('express');
const cursoRoutes = require('./routes/cursoRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

// middlewares globales
app.use(logger);
app.use(express.json());

// rutas
app.use('/api/cursos', cursoRoutes);

// ruta solo para probar el middleware de errores
app.get('/api/error', (req, res) => {
  throw new Error('Error de prueba');
});

// si no existe la ruta
app.use((req, res) => {
  res.status(404).json({ status: 'fail', message: 'Ruta no encontrada' });
});

// el de errores siempre va al final
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API de cursos en http://localhost:${PORT}`);
});
