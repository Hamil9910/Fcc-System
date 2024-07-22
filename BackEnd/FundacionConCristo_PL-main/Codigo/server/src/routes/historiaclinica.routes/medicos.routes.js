const express = require('express');
const router = express.Router();
const medicosController = require('../../controllers/historiaclinica.controllers/medicos.controller');

router
    .get('/', medicosController.get)
    .get('/:id', medicosController.getById)
    .post('/', medicosController.create)
    .put('/:id', medicosController.update)
    .delete('/:id', medicosController._delete);

module.exports = router;
