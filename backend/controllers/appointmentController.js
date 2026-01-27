const db = require('../config/db');

// @desc    Get all appointments for a user
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    let query;
    let params;

    if (req.user.role === 'doctor') {
      // If doctor, get appointments where doctor_id matches
      // First find the doctor record associated with this user
      const [doctor] = await db.execute('SELECT id FROM doctors WHERE user_id = ?', [req.user.id]);
      if (doctor.length === 0) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }
      query = `
        SELECT a.*, u.name as patient_name, u.email as patient_email 
        FROM appointments a 
        JOIN users u ON a.patient_id = u.id 
        WHERE a.doctor_id = ?
      `;
      params = [doctor[0].id];
    } else {
      // If patient, get appointments where patient_id matches
      query = `
        SELECT a.*, d.specialty, u.name as doctor_name, d.photo_url 
        FROM appointments a 
        JOIN doctors d ON a.doctor_id = d.id 
        JOIN users u ON d.user_id = u.id 
        WHERE a.patient_id = ?
      `;
      params = [req.user.id];
    }

    const [appointments] = await db.execute(query, params);
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  const { doctor_id, appointment_date, notes } = req.body;

  if (!doctor_id || !appointment_date) {
    return res.status(400).json({ message: 'Please include doctor and date' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO appointments (patient_id, doctor_id, appointment_date, notes) VALUES (?, ?, ?, ?)',
      [req.user.id, doctor_id, appointment_date, notes]
    );

    res.status(201).json({
      id: result.insertId,
      patient_id: req.user.id,
      doctor_id,
      appointment_date,
      notes,
      status: 'pending'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  const { status } = req.body; // 'confirmed', 'cancelled'

  try {
    const [result] = await db.execute(
      'UPDATE appointments SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ id: req.params.id, status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
};
