// services/velo.service.js
// Service = functions that talk to the database.
// We keep simple SQL queries here so the controller stays clean.

const db = require('../database');

function getAll(callback) {
  db.all('SELECT * FROM velos', callback);
}

function getDisponibles(callback) {
  db.all('SELECT * FROM velos WHERE etat = 0', callback);
}

function getById(id, callback) {
  db.get('SELECT * FROM velos WHERE id = ?', [id], callback);
}

function create(velo, callback) {
  const newEtat = velo.etat === 1 ? 1 : 0;
  db.run(
    'INSERT INTO velos (marque, couleur, etat) VALUES (?, ?, ?)',
    [velo.marque, velo.couleur, newEtat],
    function (err) {
      callback(err, { id: this.lastID, marque: velo.marque, couleur: velo.couleur, etat: newEtat });
    }
  );
}

function update(id, velo, callback) {
  db.run(
    'UPDATE velos SET marque = ?, couleur = ?, etat = ? WHERE id = ?',
    [velo.marque, velo.couleur, velo.etat, id],
    callback
  );
}

function remove(id, callback) {
  db.run('DELETE FROM velos WHERE id = ?', [id], callback);
}

module.exports = { getAll, getDisponibles, getById, create, update, remove };
