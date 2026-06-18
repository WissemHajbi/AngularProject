// Service = simple database functions for patients.
const db = require('../database');
function getAll(callback) { db.all('SELECT * FROM patients', callback); }
function getById(id, callback) { db.get('SELECT * FROM patients WHERE id = ?', [id], callback); }
function create(patient, callback) {
  db.run('INSERT INTO patients (firstName, lastName, cin, email, phone, address, appointmentsCount) VALUES (?, ?, ?, ?, ?, ?, ?)', [patient.firstName, patient.lastName, patient.cin, patient.email, patient.phone, patient.address, patient.appointmentsCount || 0], function (err) {
    callback(err, { id: this.lastID, firstName: patient.firstName, lastName: patient.lastName, cin: patient.cin, email: patient.email, phone: patient.phone, address: patient.address, appointmentsCount: patient.appointmentsCount || 0 });
  });
}
function update(id, patient, callback) {
  db.run('UPDATE patients SET firstName = ?, lastName = ?, cin = ?, email = ?, phone = ?, address = ?, appointmentsCount = ? WHERE id = ?', [patient.firstName, patient.lastName, patient.cin, patient.email, patient.phone, patient.address, patient.appointmentsCount, id], callback);
}
function remove(id, callback) { db.run('DELETE FROM patients WHERE id = ?', [id], callback); }
module.exports = { getAll, getById, create, update, remove };
