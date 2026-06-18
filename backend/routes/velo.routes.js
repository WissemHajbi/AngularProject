const express = require('express');
const router = express.Router();
const veloController = require('../controllers/velo.controller');

router.get('/', veloController.getAllVelos);
router.get('/disponibles', veloController.getVelosDisponibles);
router.get('/:id', veloController.getVeloById);
router.post('/', veloController.createVelo);
router.put('/:id', veloController.updateVelo);
router.delete('/:id', veloController.deleteVelo);

module.exports = router;
