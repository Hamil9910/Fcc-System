const express = require('express');
const router = express.Router();
const especialidadController = require('../../controllers/historiaclinica.controllers/especialidad.controller');

router
    .get('/', especialidadController.get)
    .get('/:id', especialidadController.getById)
    .post('/', especialidadController.create)
    .put('/:id', especialidadController.update)
    .delete('/:id', especialidadController._delete);

module.exports = router;
