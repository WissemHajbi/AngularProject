const appointmentService = require("../services/appointment.service");
function getAllAppointments(req, res) {
  appointmentService.getAll((err, rows) =>
    err ? res.status(500).json({ message: err.message }) : res.json(rows),
  );
}
function getAppointmentsByPatient(req, res) {
  appointmentService.getByPatient(req.params.patientId, (err, rows) =>
    err ? res.status(500).json({ message: err.message }) : res.json(rows),
  );
}
function bookAppointment(req, res) {
  const { doctorId, patientId } = req.body;
  appointmentService.bookAppointment(
    doctorId,
    patientId,
    (err, appointment, message) => {
      if (err) return res.status(500).json({ message: err.message });
      if (message === "Doctor not found" || message === "Patient not found")
        return res.status(404).json({ message });
      if (message) return res.status(400).json({ message });
      res.json(appointment);
    },
  );
}
function completeAppointment(req, res) {
  appointmentService.completeAppointment(
    req.params.id,
    (err, result, message) => {
      if (err) return res.status(500).json({ message: err.message });
      if (message === "Appointment not found")
        return res.status(404).json({ message });
      if (message) return res.status(400).json({ message });
      res.json(result);
    },
  );
}
module.exports = {
  getAllAppointments,
  getAppointmentsByPatient,
  bookAppointment,
  completeAppointment,
};
