// server.js
// Main Express file.
// It only starts the server and connects route files.
// The routes call controllers, and controllers call services.

const express = require('express');
const cors = require('cors');

const veloRoutes = require('./routes/velo.routes');
const adherentRoutes = require('./routes/adherent.routes');
const tourRoutes = require('./routes/tour.routes');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Mini Bike Rental API is running' });
});

app.use('/api/velos', veloRoutes);
app.use('/api/adherents', adherentRoutes);
app.use('/api/tours', tourRoutes);

app.listen(PORT, () => {
  console.log('Backend démarré sur http://localhost:' + PORT + '/api');
});
