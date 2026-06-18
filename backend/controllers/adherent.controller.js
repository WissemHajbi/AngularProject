// controllers/adherent.controller.js
// Controller for adherent API routes.

const adherentService = require('../services/adherent.service');

function getAllAdherents(req, res) {
  adherentService.getAll((err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
}

function getAdherentById(req, res) {
  adherentService.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: 'Adhérent introuvable' });
    res.json(row);
  });
}

function createAdherent(req, res) {
  adherentService.create(req.body, (err, adherent) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(adherent);
  });
}

function updateAdherent(req, res) {
  adherentService.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Adhérent modifié' });
  });
}

function deleteAdherent(req, res) {
  adherentService.remove(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Adhérent supprimé' });
  });
}

module.exports = { getAllAdherents, getAdherentById, createAdherent, updateAdherent, deleteAdherent };
