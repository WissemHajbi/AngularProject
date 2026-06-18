// services/tour.service.js
// Simple database functions for tours/rentals.
// The business rules for faire-tour and retourner are here.

const db = require('../database');

function today() {
  return new Date().toISOString().slice(0, 10);
}

function getAll(callback) {
  db.all('SELECT * FROM tours', callback);
}

function getByAdherent(adherentId, callback) {
  db.all('SELECT * FROM tours WHERE adherentId = ?', [adherentId], callback);
}

function faireTour(veloId, adherentId, callback) {
  db.get('SELECT * FROM velos WHERE id = ?', [veloId], (err, velo) => {
    if (err) return callback(err);
    if (!velo) return callback(null, null, 'Vélo introuvable');
    if (velo.etat !== 0) return callback(null, null, 'Ce vélo est déjà emprunté');

    db.get('SELECT * FROM adherents WHERE id = ?', [adherentId], (err2, adherent) => {
      if (err2) return callback(err2);
      if (!adherent) return callback(null, null, 'Adhérent introuvable');

      const date_emp = today();
      db.run(
        'INSERT INTO tours (veloId, adherentId, date_emp, date_retour) VALUES (?, ?, ?, ?)',
        [veloId, adherentId, date_emp, null],
        function (err3) {
          if (err3) return callback(err3);

          const tour = { id: this.lastID, veloId, adherentId, date_emp, date_retour: null };
          db.run('UPDATE velos SET etat = 1 WHERE id = ?', [veloId]);
          db.run('UPDATE adherents SET nbVeloencours = nbVeloencours + 1 WHERE id = ?', [adherentId]);
          callback(null, tour);
        }
      );
    });
  });
}

function retournerTour(id, callback) {
  db.get('SELECT * FROM tours WHERE id = ?', [id], (err, tour) => {
    if (err) return callback(err);
    if (!tour) return callback(null, null, 'Tour introuvable');
    if (tour.date_retour) return callback(null, null, 'Tour déjà retourné');

    const date_retour = today();
    db.run('UPDATE tours SET date_retour = ? WHERE id = ?', [date_retour, id], (err2) => {
      if (err2) return callback(err2);

      db.run('UPDATE velos SET etat = 0 WHERE id = ?', [tour.veloId]);
      db.run(
        'UPDATE adherents SET nbVeloencours = CASE WHEN nbVeloencours > 0 THEN nbVeloencours - 1 ELSE 0 END WHERE id = ?',
        [tour.adherentId]
      );
      callback(null, { message: 'Vélo retourné', date_retour: date_retour });
    });
  });
}

module.exports = { getAll, getByAdherent, faireTour, retournerTour };
