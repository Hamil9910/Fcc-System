const express = require('express');
const router = express.Router();
const tipo_especialidadController = require('../../controllers/historiaclinica.controllers/tipo_especialidad.controller');

router
    .get('/', tipo_especialidadController.get)
    .get('/:id', tipo_especialidadController.getById)
    .post('/', tipo_especialidadController.create)
    .put('/:id', tipo_especialidadController.update)
    .delete('/:id', tipo_especialidadController._delete);

module.exports = router;
