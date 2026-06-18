// database.js
// Creates one simple SQLite database file for the clinic project.

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./clinic.db', (err) => {
  if (err) console.error('SQLite connection error:', err.message);
  else console.log('SQLite connected successfully.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    specialty TEXT,
    email TEXT,
    phone TEXT,
    available INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    cin TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    appointmentsCount INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctorId INTEGER,
    patientId INTEGER,
    appointmentDate TEXT,
    endDate TEXT
  )`);

  // Small demo data inserted only when tables are empty.
  db.get('SELECT COUNT(*) AS total FROM doctors', (err, row) => {
    if (!err && row.total === 0) {
      db.run('INSERT INTO doctors (firstName, lastName, specialty, email, phone, available) VALUES (?, ?, ?, ?, ?, ?)', ['John', 'Smith', 'Cardiology', 'john.smith@clinic.com', '55510001', 1]);
      db.run('INSERT INTO doctors (firstName, lastName, specialty, email, phone, available) VALUES (?, ?, ?, ?, ?, ?)', ['Emily', 'Brown', 'Dentist', 'emily.brown@clinic.com', '55510002', 1]);
      db.run('INSERT INTO doctors (firstName, lastName, specialty, email, phone, available) VALUES (?, ?, ?, ?, ?, ?)', ['David', 'Wilson', 'General Medicine', 'david.wilson@clinic.com', '55510003', 1]);
    }
  });

  db.get('SELECT COUNT(*) AS total FROM patients', (err, row) => {
    if (!err && row.total === 0) {
      db.run('INSERT INTO patients (firstName, lastName, cin, email, phone, address, appointmentsCount) VALUES (?, ?, ?, ?, ?, ?, ?)', ['Alice', 'Green', 'AA123456', 'alice@email.com', '55520001', 'Main Street', 0]);
      db.run('INSERT INTO patients (firstName, lastName, cin, email, phone, address, appointmentsCount) VALUES (?, ?, ?, ?, ?, ?, ?)', ['Mark', 'Taylor', 'BB123456', 'mark@email.com', '55520002', 'Second Street', 0]);
    }
  });
});

module.exports = db;
