const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller');

router.get('/', tourController.getAllTours);
router.get('/adherent/:adherentId', tourController.getToursByAdherent);
router.post('/faire-tour', tourController.faireTour);
router.put('/:id/retourner', tourController.retournerTour);

module.exports = router;
