const express = require('express');
const router = express.Router();
const pacienteController = require('../../controllers/historiaclinica.controllers/paciente.controller');

router
    .get('/', pacienteController.get)
    .get('/:id', pacienteController.getById)
    .post('/', pacienteController.create)
    .put('/:id', pacienteController.update)
    .delete('/:id', pacienteController._delete);

module.exports = router;
