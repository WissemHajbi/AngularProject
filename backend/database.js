// database.js
// This file creates one simple SQLite database file and the three tables used by the project.

const sqlite3 = require('sqlite3').verbose();

// The database will be saved in backend/bike_rental.db
const db = new sqlite3.Database('./bike_rental.db', (err) => {
  if (err) {
    console.error('Erreur connexion SQLite:', err.message);
  } else {
    console.log('Connexion SQLite réussie.');
  }
});

// serialize means: execute these SQL commands one after another.
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS velos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      marque TEXT,
      couleur TEXT,
      etat INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS adherents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT,
      prenom TEXT,
      cin TEXT,
      email TEXT,
      tel TEXT,
      adresse TEXT,
      nbVeloencours INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      veloId INTEGER,
      adherentId INTEGER,
      date_emp TEXT,
      date_retour TEXT
    )
  `);

  // Small demo data, inserted only when tables are empty.
  db.get('SELECT COUNT(*) AS total FROM velos', (err, row) => {
    if (!err && row.total === 0) {
      db.run('INSERT INTO velos (marque, couleur, etat) VALUES (?, ?, ?)', ['Btwin', 'Rouge', 0]);
      db.run('INSERT INTO velos (marque, couleur, etat) VALUES (?, ?, ?)', ['Trek', 'Noir', 0]);
      db.run('INSERT INTO velos (marque, couleur, etat) VALUES (?, ?, ?)', ['Giant', 'Bleu', 0]);
    }
  });

  db.get('SELECT COUNT(*) AS total FROM adherents', (err, row) => {
    if (!err && row.total === 0) {
      db.run(
        'INSERT INTO adherents (nom, prenom, cin, email, tel, adresse, nbVeloencours) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Ben Ali', 'Ahmed', 'AA123456', 'ahmed@email.com', '22111222', 'Tunis', 0]
      );
      db.run(
        'INSERT INTO adherents (nom, prenom, cin, email, tel, adresse, nbVeloencours) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Trabelsi', 'Sarra', 'BB123456', 'sarra@email.com', '22333444', 'Sfax', 0]
      );
    }
  });
});

module.exports = db;
