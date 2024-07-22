const express = require('express');
const router = express.Router();
const tipo_enfermedadController = require('../../controllers/historiaclinica.controllers/tipo_enfermedad.controller');

router
    .get('/', tipo_enfermedadController.get)
    .get('/:id', tipo_enfermedadController.getById)
    .post('/', tipo_enfermedadController.create)
    .put('/:id', tipo_enfermedadController.update)
    .delete('/:id', tipo_enfermedadController._delete);

module.exports = router;
