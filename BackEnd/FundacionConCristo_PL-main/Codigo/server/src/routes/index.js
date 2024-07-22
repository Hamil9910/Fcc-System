const express = require('express'); 

const enfermedadesRouter = require('./historiaclinica.routes/enfermedades.routes');
const tipo_enfermedadRouter = require('./historiaclinica.routes/tipo_enfermedad.routes');
const examenRouter = require('./historiaclinica.routes/examen.routes');
const tipo_examenRouter = require('./historiaclinica.routes/tipo_examen.routes');
const especialidadRouter = require('./historiaclinica.routes/especialidad.routes');
const tipo_especialidadRouter = require('./historiaclinica.routes/tipo_especialidad.routes');
const apsRouter = require('./historiaclinica.routes/aps.routes');
const medicosRouter = require('./historiaclinica.routes/medicos.routes');
const historiaRouter = require('./historiaclinica.routes/historia.routes');
const pacienteRouter = require('./historiaclinica.routes/historia.routes');



function routerApi(app) {
  const router = express.Router();
  app.use('/api/fcc', router); 
  router.use('/enfermedades', enfermedadesRouter)
  router.use('/tipo_enfermedad', tipo_enfermedadRouter)
  router.use('/examen', examenRouter)
  router.use('/tipo_examen', tipo_examenRouter)
  router.use('/especialidad', especialidadRouter)
  router.use('/tipo_especialidad', tipo_especialidadRouter)
  router.use('/aps', apsRouter)
  router.use('/medicos', medicosRouter)
  router.use('/historia', historiaRouter)
  router.use('/paciente', pacienteRouter)
}

module.exports = routerApi;
