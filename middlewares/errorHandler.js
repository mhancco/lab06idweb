// middlewares/errorHandler.js
// Middleware de errores: tiene 4 parametros, asi Express sabe que es para errores

const errorHandler = (err, req, res, next) => {
  console.error('Error capturado:', err.message);

  // si el JSON del body viene mal escrito express.json() manda status 400
  const codigo = err.status || 500;

  res.status(codigo).json({
    status: 'error',
    message: codigo === 500 ? 'Error interno del servidor' : err.message,
  });
};

module.exports = errorHandler;
