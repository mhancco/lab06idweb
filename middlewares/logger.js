// middlewares/logger.js
// Middleware de auditoria: muestra el metodo, la URL y cuanto demoro la respuesta

const logger = (req, res, next) => {
  const inicio = Date.now();

  // 'finish' se dispara cuando ya se envio la respuesta
  res.on('finish', () => {
    const tiempo = Date.now() - inicio;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${tiempo} ms)`);
  });

  next();
};

module.exports = logger;
