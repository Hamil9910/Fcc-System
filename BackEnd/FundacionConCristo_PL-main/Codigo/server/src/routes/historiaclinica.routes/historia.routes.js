const express = require('express');
const router = express.Router();
const historiaController = require('../../controllers/historiaclinica.controllers/historia.controller');

router
    .get('/', historiaController.get)
    .get('/:id', historiaController.getById)
    .post('/', historiaController.create)
    .put('/:id', historiaController.update)
    .delete('/:id', historiaController._delete);

module.exports = router;
