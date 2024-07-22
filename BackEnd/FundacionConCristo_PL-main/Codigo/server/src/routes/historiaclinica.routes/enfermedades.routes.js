const express = require('express');
const router = express.Router();
const enfermedadesController = require('../../controllers/historiaclinica.controllers/enfermedades.controller');

router
    .get('/', enfermedadesController.get)
    .get('/:id', enfermedadesController.getById)
    .post('/', enfermedadesController.create)
    .put('/:id', enfermedadesController.update)
    .delete('/:id', enfermedadesController._delete);

module.exports = router;
