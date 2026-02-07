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
        SELECT a.*, 
               u.name as patient_name, 
               u.email as patient_email,
               du.name as doctor_name,
               d.specialty,
               d.photo_url
        FROM appointments a 
        JOIN users u ON a.patient_id = u.id 
        JOIN doctors d ON a.doctor_id = d.id
        JOIN users du ON d.user_id = du.id
        WHERE a.doctor_id = ?
      `;
      params = [doctor[0].id];
    } else {
      // If patient, get appointments where patient_id matches
      query = `
        SELECT a.*, 
               u.name as doctor_name,
               pu.name as patient_name,
               d.specialty, 
               d.photo_url 
        FROM appointments a 
        JOIN doctors d ON a.doctor_id = d.id 
        JOIN users u ON d.user_id = u.id 
        JOIN users pu ON a.patient_id = pu.id
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

// @desc    Get single appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    let query;
    let params;

    if (req.user.role === 'doctor') {
      // Doctor can view appointments where they are the doctor
      const [doctor] = await db.execute('SELECT id FROM doctors WHERE user_id = ?', [req.user.id]);
      if (doctor.length === 0) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }
      query = `
        SELECT a.*, u.name as patient_name, u.email as patient_email 
        FROM appointments a 
        JOIN users u ON a.patient_id = u.id 
        WHERE a.id = ? AND a.doctor_id = ?
      `;
      params = [req.params.id, doctor[0].id];
    } else {
      // Patient can view their own appointments
      query = `
        SELECT a.*, d.specialty, u.name as doctor_name, d.photo_url 
        FROM appointments a 
        JOIN doctors d ON a.doctor_id = d.id 
        JOIN users u ON d.user_id = u.id 
        WHERE a.id = ? AND a.patient_id = ?
      `;
      params = [req.params.id, req.user.id];
    }

    const [appointments] = await db.execute(query, params);

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointments[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  const { doctor_id, patient_id, appointment_date, notes } = req.body;

  try {
    let final_doctor_id = doctor_id;
    let final_patient_id = patient_id;
    let status = 'pending';

    if (req.user.role === 'doctor') {
      // Doctor initiated booking
      if (!patient_id) {
        return res.status(400).json({ message: 'Please include patient_id' });
      }

      // Get doctor record for current user
      const [doctor] = await db.execute('SELECT id FROM doctors WHERE user_id = ?', [req.user.id]);
      if (doctor.length === 0) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }
      final_doctor_id = doctor[0].id;
      status = 'proposed';

      // Verify history exists (has at least one prior appointment)
      const [history] = await db.execute(
        'SELECT id FROM appointments WHERE patient_id = ? AND doctor_id = ? LIMIT 1',
        [patient_id, final_doctor_id]
      );

      if (history.length === 0) {
        return res.status(403).json({ message: 'You can only book appointments for patients you have a history with' });
      }
    } else {
      // Patient initiated booking
      if (!doctor_id) {
        return res.status(400).json({ message: 'Please include doctor_id' });
      }
      final_patient_id = req.user.id;
      status = 'pending';
    }

    const [result] = await db.execute(
      'INSERT INTO appointments (patient_id, doctor_id, appointment_date, notes, status) VALUES (?, ?, ?, ?, ?)',
      [final_patient_id, final_doctor_id, appointment_date, notes || '', status]
    );

    res.status(201).json({
      id: result.insertId,
      patient_id: final_patient_id,
      doctor_id: final_doctor_id,
      appointment_date,
      notes,
      status
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

// @desc    Reschedule appointment
// @route   PUT /api/appointments/:id/reschedule
// @access  Private
const rescheduleAppointment = async (req, res) => {
  const { appointment_date } = req.body;

  if (!appointment_date) {
    return res.status(400).json({ message: 'Please provide new appointment date' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE appointments SET appointment_date = ? WHERE id = ?',
      [appointment_date, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({
      id: req.params.id,
      appointment_date,
      message: 'Appointment rescheduled successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  rescheduleAppointment,
};
