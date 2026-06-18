const db = require("../database");
function getAll(callback) {
  db.all("SELECT * FROM doctors", callback);
}
function getAvailable(callback) {
  db.all("SELECT * FROM doctors WHERE available = 1", callback);
}

function getById(id, callback) {
  db.get("SELECT * FROM doctors WHERE id = ?", [id], callback);
}

function create(doctor, callback) {
  const available = doctor.available === 0 ? 0 : 1;
  db.run(
    "INSERT INTO doctors (firstName, lastName, specialty, email, phone, available) VALUES (?, ?, ?, ?, ?, ?)",
    [
      doctor.firstName,
      doctor.lastName,
      doctor.specialty,
      doctor.email,
      doctor.phone,
      available,
    ],
    function (err) {
      callback(err, {
        id: this.lastID,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        specialty: doctor.specialty,
        email: doctor.email,
        phone: doctor.phone,
        available,
      });
    },
  );
}
function update(id, doctor, callback) {
  db.run(
    "UPDATE doctors SET firstName = ?, lastName = ?, specialty = ?, email = ?, phone = ?, available = ? WHERE id = ?",
    [
      doctor.firstName,
      doctor.lastName,
      doctor.specialty,
      doctor.email,
      doctor.phone,
      doctor.available,
      id,
    ],
    callback,
  );
}
function remove(id, callback) {
  db.run("DELETE FROM doctors WHERE id = ?", [id], callback);
}
module.exports = { getAll, getAvailable, getById, create, update, remove };
