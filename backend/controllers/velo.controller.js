// controllers/velo.controller.js
// Controller = receives HTTP requests and sends HTTP responses.
// It calls the service to work with the database.

const veloService = require('../services/velo.service');

function getAllVelos(req, res) {
  veloService.getAll((err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
}

function getVelosDisponibles(req, res) {
  veloService.getDisponibles((err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
}

function getVeloById(req, res) {
  veloService.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: 'Vélo introuvable' });
    res.json(row);
  });
}

function createVelo(req, res) {
  veloService.create(req.body, (err, velo) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(velo);
  });
}

function updateVelo(req, res) {
  veloService.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Vélo modifié' });
  });
}

function deleteVelo(req, res) {
  veloService.remove(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Vélo supprimé' });
  });
}

module.exports = { getAllVelos, getVelosDisponibles, getVeloById, createVelo, updateVelo, deleteVelo };
