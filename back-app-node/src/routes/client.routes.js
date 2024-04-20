const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController');

router.post('/ajouter', clientController.create);
router.get('/', clientController.read);
router.get('/:id', clientController.readOne);
router.put('/:id', clientController.update);
router.delete('/delete/:id', clientController.delete);

module.exports = router; 