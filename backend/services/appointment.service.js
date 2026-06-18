// Service for appointments. It contains simple business logic.
const db = require('../database');
function today() { return new Date().toISOString().slice(0, 10); }
function getAll(callback) { db.all('SELECT * FROM appointments', callback); }
function getByPatient(patientId, callback) { db.all('SELECT * FROM appointments WHERE patientId = ?', [patientId], callback); }
function bookAppointment(doctorId, patientId, callback) {
  db.get('SELECT * FROM doctors WHERE id = ?', [doctorId], (err, doctor) => {
    if (err) return callback(err);
    if (!doctor) return callback(null, null, 'Doctor not found');
    if (doctor.available !== 1) return callback(null, null, 'Doctor is not available');
    db.get('SELECT * FROM patients WHERE id = ?', [patientId], (err2, patient) => {
      if (err2) return callback(err2);
      if (!patient) return callback(null, null, 'Patient not found');
      const appointmentDate = today();
      db.run('INSERT INTO appointments (doctorId, patientId, appointmentDate, endDate) VALUES (?, ?, ?, ?)', [doctorId, patientId, appointmentDate, null], function (err3) {
        if (err3) return callback(err3);
        const appointment = { id: this.lastID, doctorId, patientId, appointmentDate, endDate: null };
        db.run('UPDATE doctors SET available = 0 WHERE id = ?', [doctorId]);
        db.run('UPDATE patients SET appointmentsCount = appointmentsCount + 1 WHERE id = ?', [patientId]);
        callback(null, appointment);
      });
    });
  });
}
function completeAppointment(id, callback) {
  db.get('SELECT * FROM appointments WHERE id = ?', [id], (err, appointment) => {
    if (err) return callback(err);
    if (!appointment) return callback(null, null, 'Appointment not found');
    if (appointment.endDate) return callback(null, null, 'Appointment already completed');
    const endDate = today();
    db.run('UPDATE appointments SET endDate = ? WHERE id = ?', [endDate, id], (err2) => {
      if (err2) return callback(err2);
      db.run('UPDATE doctors SET available = 1 WHERE id = ?', [appointment.doctorId]);
      db.run('UPDATE patients SET appointmentsCount = CASE WHEN appointmentsCount > 0 THEN appointmentsCount - 1 ELSE 0 END WHERE id = ?', [appointment.patientId]);
      callback(null, { message: 'Appointment completed', endDate });
    });
  });
}
module.exports = { getAll, getByPatient, bookAppointment, completeAppointment };
