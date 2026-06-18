// controllers/tour.controller.js
// Controller for tour/rental API routes.

const tourService = require('../services/tour.service');

function getAllTours(req, res) {
  tourService.getAll((err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
}

function getToursByAdherent(req, res) {
  tourService.getByAdherent(req.params.adherentId, (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
}

function faireTour(req, res) {
  const { veloId, adherentId } = req.body;

  tourService.faireTour(veloId, adherentId, (err, tour, message) => {
    if (err) return res.status(500).json({ message: err.message });
    if (message === 'Vélo introuvable' || message === 'Adhérent introuvable') return res.status(404).json({ message: message });
    if (message) return res.status(400).json({ message: message });
    res.json(tour);
  });
}

function retournerTour(req, res) {
  tourService.retournerTour(req.params.id, (err, result, message) => {
    if (err) return res.status(500).json({ message: err.message });
    if (message === 'Tour introuvable') return res.status(404).json({ message: message });
    if (message) return res.status(400).json({ message: message });
    res.json(result);
  });
}

module.exports = { getAllTours, getToursByAdherent, faireTour, retournerTour };
