const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
router.get('/', appointmentController.getAllAppointments);
router.get('/patient/:patientId', appointmentController.getAppointmentsByPatient);
router.post('/book', appointmentController.bookAppointment);
router.put('/:id/complete', appointmentController.completeAppointment);
module.exports = router;
