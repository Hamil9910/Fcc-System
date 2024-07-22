const express = require('express');
const router = express.Router();
const examenController = require('../../controllers/historiaclinica.controllers/examen.controller');

router
    .get('/', examenController.get)
    .get('/:id', examenController.getById)
    .post('/', examenController.create)
    .put('/:id', examenController.update)
    .delete('/:id', examenController._delete);

module.exports = router;
