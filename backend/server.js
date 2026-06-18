// server.js
// Very simple Express server with direct SQL queries.
// No ORM, no authentication, no advanced architecture: only routes and SQLite.

const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

function today() {
  return new Date().toISOString().slice(0, 10);
}

// -------------------- VELOS CRUD --------------------
app.get('/api/velos', (req, res) => {
  db.all('SELECT * FROM velos', (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

app.get('/api/velos/disponibles', (req, res) => {
  db.all('SELECT * FROM velos WHERE etat = 0', (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

app.get('/api/velos/:id', (req, res) => {
  db.get('SELECT * FROM velos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: 'Vélo introuvable' });
    res.json(row);
  });
});

app.post('/api/velos', (req, res) => {
  const { marque, couleur, etat } = req.body;
  const newEtat = etat === 1 ? 1 : 0;
  db.run('INSERT INTO velos (marque, couleur, etat) VALUES (?, ?, ?)', [marque, couleur, newEtat], function (err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ id: this.lastID, marque, couleur, etat: newEtat });
  });
});

app.put('/api/velos/:id', (req, res) => {
  const { marque, couleur, etat } = req.body;
  db.run('UPDATE velos SET marque = ?, couleur = ?, etat = ? WHERE id = ?', [marque, couleur, etat, req.params.id], function (err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Vélo modifié' });
  });
});

app.delete('/api/velos/:id', (req, res) => {
  db.run('DELETE FROM velos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Vélo supprimé' });
  });
});

// -------------------- ADHERENTS CRUD --------------------
app.get('/api/adherents', (req, res) => {
  db.all('SELECT * FROM adherents', (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

app.get('/api/adherents/:id', (req, res) => {
  db.get('SELECT * FROM adherents WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: 'Adhérent introuvable' });
    res.json(row);
  });
});

app.post('/api/adherents', (req, res) => {
  const { nom, prenom, cin, email, tel, adresse, nbVeloencours } = req.body;
  db.run(
    'INSERT INTO adherents (nom, prenom, cin, email, tel, adresse, nbVeloencours) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nom, prenom, cin, email, tel, adresse, nbVeloencours || 0],
    function (err) {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ id: this.lastID, nom, prenom, cin, email, tel, adresse, nbVeloencours: nbVeloencours || 0 });
    }
  );
});

app.put('/api/adherents/:id', (req, res) => {
  const { nom, prenom, cin, email, tel, adresse, nbVeloencours } = req.body;
  db.run(
    'UPDATE adherents SET nom = ?, prenom = ?, cin = ?, email = ?, tel = ?, adresse = ?, nbVeloencours = ? WHERE id = ?',
    [nom, prenom, cin, email, tel, adresse, nbVeloencours, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Adhérent modifié' });
    }
  );
});

app.delete('/api/adherents/:id', (req, res) => {
  db.run('DELETE FROM adherents WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Adhérent supprimé' });
  });
});

// -------------------- TOURS --------------------
app.get('/api/tours', (req, res) => {
  db.all('SELECT * FROM tours', (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

app.get('/api/tours/adherent/:adherentId', (req, res) => {
  db.all('SELECT * FROM tours WHERE adherentId = ?', [req.params.adherentId], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

app.post('/api/tours/faire-tour', (req, res) => {
  const { veloId, adherentId } = req.body;

  db.get('SELECT * FROM velos WHERE id = ?', [veloId], (err, velo) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!velo) return res.status(404).json({ message: 'Vélo introuvable' });
    if (velo.etat !== 0) return res.status(400).json({ message: 'Ce vélo est déjà emprunté' });

    db.get('SELECT * FROM adherents WHERE id = ?', [adherentId], (err2, adherent) => {
      if (err2) return res.status(500).json({ message: err2.message });
      if (!adherent) return res.status(404).json({ message: 'Adhérent introuvable' });

      const date_emp = today();
      db.run('INSERT INTO tours (veloId, adherentId, date_emp, date_retour) VALUES (?, ?, ?, ?)', [veloId, adherentId, date_emp, null], function (err3) {
        if (err3) return res.status(500).json({ message: err3.message });

        const tour = { id: this.lastID, veloId, adherentId, date_emp, date_retour: null };
        db.run('UPDATE velos SET etat = 1 WHERE id = ?', [veloId]);
        db.run('UPDATE adherents SET nbVeloencours = nbVeloencours + 1 WHERE id = ?', [adherentId]);
        res.json(tour);
      });
    });
  });
});

app.put('/api/tours/:id/retourner', (req, res) => {
  db.get('SELECT * FROM tours WHERE id = ?', [req.params.id], (err, tour) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!tour) return res.status(404).json({ message: 'Tour introuvable' });
    if (tour.date_retour) return res.status(400).json({ message: 'Tour déjà retourné' });

    const date_retour = today();
    db.run('UPDATE tours SET date_retour = ? WHERE id = ?', [date_retour, req.params.id], function (err2) {
      if (err2) return res.status(500).json({ message: err2.message });

      db.run('UPDATE velos SET etat = 0 WHERE id = ?', [tour.veloId]);
      db.run('UPDATE adherents SET nbVeloencours = CASE WHEN nbVeloencours > 0 THEN nbVeloencours - 1 ELSE 0 END WHERE id = ?', [tour.adherentId]);
      res.json({ message: 'Vélo retourné', date_retour });
    });
  });
});

app.listen(PORT, () => {
  console.log('Backend démarré sur http://localhost:' + PORT + '/api');
});
