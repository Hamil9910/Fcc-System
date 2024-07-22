const express = require('express');
const router = express.Router();
const tipo_examenController = require('../../controllers/historiaclinica.controllers/tipo_examen.controller');

router
    .get('/', tipo_examenController.get)
    .get('/:id', tipo_examenController.getById)
    .post('/', tipo_examenController.create)
    .put('/:id', tipo_examenController.update)
    .delete('/:id', tipo_examenController._delete);

module.exports = router;
