const express = require('express');
const router = express.Router();
const carController = require('../controller/car.controller');

router.post('/ajouter', carController.create);
// router.put('/importer/:id', carController.uploadImage);
router.get('/', carController.read);
router.get('/:id', carController.readOne);
router.put('/:id', carController.update);
router.delete('/delete/:id', carController.delete);

module.exports = router;  