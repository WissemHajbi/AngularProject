// services/adherent.service.js
// Simple database functions for adherents.

const db = require('../database');

function getAll(callback) {
  db.all('SELECT * FROM adherents', callback);
}

function getById(id, callback) {
  db.get('SELECT * FROM adherents WHERE id = ?', [id], callback);
}

function create(adherent, callback) {
  db.run(
    'INSERT INTO adherents (nom, prenom, cin, email, tel, adresse, nbVeloencours) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [adherent.nom, adherent.prenom, adherent.cin, adherent.email, adherent.tel, adherent.adresse, adherent.nbVeloencours || 0],
    function (err) {
      callback(err, {
        id: this.lastID,
        nom: adherent.nom,
        prenom: adherent.prenom,
        cin: adherent.cin,
        email: adherent.email,
        tel: adherent.tel,
        adresse: adherent.adresse,
        nbVeloencours: adherent.nbVeloencours || 0
      });
    }
  );
}

function update(id, adherent, callback) {
  db.run(
    'UPDATE adherents SET nom = ?, prenom = ?, cin = ?, email = ?, tel = ?, adresse = ?, nbVeloencours = ? WHERE id = ?',
    [adherent.nom, adherent.prenom, adherent.cin, adherent.email, adherent.tel, adherent.adresse, adherent.nbVeloencours, id],
    callback
  );
}

function remove(id, callback) {
  db.run('DELETE FROM adherents WHERE id = ?', [id], callback);
}

module.exports = { getAll, getById, create, update, remove };
