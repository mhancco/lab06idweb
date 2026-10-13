// controllers/cursoController.js
// Aqui va la logica de los cursos. Los datos se cargan del JSON y
// se quedan en memoria mientras el servidor este prendido.

let cursos = require('../data/cursos.json');

// revisa que vengan los 3 campos obligatorios
const validarCurso = (body) => {
  const { nombre, codigo, creditos } = body;
  if (!nombre || !codigo || !creditos) {
    return 'Faltan campos obligatorios (nombre, codigo, creditos)';
  }
  if (isNaN(parseInt(creditos))) {
    return 'El campo creditos debe ser un numero';
  }
  return null;
};

// GET /api/cursos   y   GET /api/cursos?creditos=4
exports.getAllCursos = (req, res) => {
  const { creditos } = req.query;
  let resultado = cursos;

  if (creditos) {
    resultado = cursos.filter((c) => c.creditos === parseInt(creditos));
  }

  res.status(200).json({ status: 'success', total: resultado.length, data: resultado });
};

// GET /api/cursos/:id
exports.getCursoById = (req, res) => {
  const id = parseInt(req.params.id);
  const curso = cursos.find((c) => c.id === id);

  if (!curso) {
    return res.status(404).json({ status: 'fail', message: 'Curso no encontrado' });
  }

  res.status(200).json({ status: 'success', data: curso });
};

// POST /api/cursos
exports.createCurso = (req, res) => {
  const body = req.body || {};
  const error = validarCurso(body);

  if (error) {
    return res.status(400).json({ status: 'fail', message: error });
  }

  const ultimo = cursos[cursos.length - 1];
  const nuevoCurso = {
    id: ultimo ? ultimo.id + 1 : 1,
    nombre: body.nombre,
    codigo: body.codigo,
    creditos: parseInt(body.creditos),
  };

  cursos = [...cursos, nuevoCurso];
  res.status(201).json({ status: 'success', data: nuevoCurso });
};

// PUT /api/cursos/:id
exports.updateCurso = (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body || {};
  const existe = cursos.find((c) => c.id === id);

  if (!existe) {
    return res.status(404).json({ status: 'fail', message: 'Curso no encontrado' });
  }

  const error = validarCurso(body);
  if (error) {
    return res.status(400).json({ status: 'fail', message: error });
  }

  const actualizado = {
    id: id,
    nombre: body.nombre,
    codigo: body.codigo,
    creditos: parseInt(body.creditos),
  };

  cursos = cursos.map((c) => (c.id === id ? actualizado : c));
  res.status(200).json({ status: 'success', data: actualizado });
};

// DELETE /api/cursos/:id
exports.deleteCurso = (req, res) => {
  const id = parseInt(req.params.id);
  const existe = cursos.find((c) => c.id === id);

  if (!existe) {
    return res.status(404).json({ status: 'fail', message: 'Curso no encontrado' });
  }

  cursos = cursos.filter((c) => c.id !== id);
  res.status(200).json({ status: 'success', message: `Curso con id ${id} eliminado` });
};
