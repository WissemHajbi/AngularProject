// Main Express file. Simple flow: routes -> controllers -> services -> SQLite database.
const express = require('express');
const cors = require('cors');
const doctorRoutes = require('./routes/doctor.routes');
const patientRoutes = require('./routes/patient.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());
app.get('/api', (req, res) => res.json({ message: 'Mini Clinic API is running' }));
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);
app.listen(PORT, () => console.log('Backend started on http://localhost:' + PORT + '/api'));
