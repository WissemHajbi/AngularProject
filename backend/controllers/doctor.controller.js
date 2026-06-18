const doctorService = require("../services/doctor.service");
function getAllDoctors(req, res) {
  doctorService.getAll((err, rows) =>
    err ? res.status(500).json({ message: err.message }) : res.json(rows),
  );
}
function getAvailableDoctors(req, res) {
  doctorService.getAvailable((err, rows) =>
    err ? res.status(500).json({ message: err.message }) : res.json(rows),
  );
}
function getDoctorById(req, res) {
  doctorService.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: "Doctor not found" });
    res.json(row);
  });
}
function createDoctor(req, res) {
  doctorService.create(req.body, (err, doctor) =>
    err ? res.status(500).json({ message: err.message }) : res.json(doctor),
  );
}
function updateDoctor(req, res) {
  doctorService.update(req.params.id, req.body, (err) =>
    err
      ? res.status(500).json({ message: err.message })
      : res.json({ message: "Doctor updated" }),
  );
}
function deleteDoctor(req, res) {
  doctorService.remove(req.params.id, (err) =>
    err
      ? res.status(500).json({ message: err.message })
      : res.json({ message: "Doctor deleted" }),
  );
}
module.exports = {
  getAllDoctors,
  getAvailableDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
