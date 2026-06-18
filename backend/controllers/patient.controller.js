const patientService = require("../services/patient.service");
function getAllPatients(req, res) {
  patientService.getAll((err, rows) =>
    err ? res.status(500).json({ message: err.message }) : res.json(rows),
  );
}
function getPatientById(req, res) {
  patientService.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: "Patient not found" });
    res.json(row);
  });
}
function createPatient(req, res) {
  patientService.create(req.body, (err, patient) =>
    err ? res.status(500).json({ message: err.message }) : res.json(patient),
  );
}
function updatePatient(req, res) {
  patientService.update(req.params.id, req.body, (err) =>
    err
      ? res.status(500).json({ message: err.message })
      : res.json({ message: "Patient updated" }),
  );
}
function deletePatient(req, res) {
  patientService.remove(req.params.id, (err) =>
    err
      ? res.status(500).json({ message: err.message })
      : res.json({ message: "Patient deleted" }),
  );
}
module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
