const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const initializeDatabase = require('./config/initDb');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/medical-records', require('./routes/medicalRecordRoutes'));

app.get('/', (req, res) => {
  res.send('Doctor Appointment API is running');
});

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database first
    await initializeDatabase();

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
