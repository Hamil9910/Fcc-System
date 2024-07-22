const express = require('express');
const router = express.Router();
const apsController = require('../../controllers/historiaclinica.controllers/aps.controller');

router
    .get('/', apsController.get)
    .get('/:id', apsController.getById)
    .post('/', apsController.create)
    .put('/:id', apsController.update)
    .delete('/:id', apsController._delete);

module.exports = router;
