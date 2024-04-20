const express = require('express');
const router = express.Router();
const AchatController = require('../controller/achat.Controller');

router.post('/ajouter', AchatController.create);
router.get('/', AchatController.read);
router.get('/:id', AchatController.readOne);
router.get('/pdf/:id', AchatController.readOnePdf);
router.put('/:id', AchatController.update);
router.delete('/delete/:id', AchatController.delete);
 
module.exports = router;   