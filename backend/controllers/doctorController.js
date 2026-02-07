const db = require('../config/db');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const [doctors] = await db.execute(`
      SELECT d.*, u.name, u.email 
      FROM doctors d 
      JOIN users u ON d.user_id = u.id
    `);
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const [doctors] = await db.execute(`
      SELECT d.*, u.name, u.email 
      FROM doctors d 
      JOIN users u ON d.user_id = u.id 
      WHERE d.id = ?
    `, [req.params.id]);

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctors[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get patients for the logged-in doctor
// @route   GET /api/doctors/patients
// @access  Private (Doctor only)
const getDoctorPatients = async (req, res) => {
  try {
    // 1. Get Doctor ID from User ID
    const [doctor] = await db.execute('SELECT id FROM doctors WHERE user_id = ?', [req.user.id]);

    if (doctor.length === 0) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const doctorId = doctor[0].id;

    // 2. Get unique patients with their latest appointment details
    const query = `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        MAX(a.appointment_date) as last_visit,
        (SELECT status FROM appointments WHERE patient_id = u.id AND doctor_id = ? ORDER BY appointment_date DESC LIMIT 1) as status
      FROM users u
      JOIN appointments a ON u.id = a.patient_id
      WHERE a.doctor_id = ?
      GROUP BY u.id
    `;

    const [patients] = await db.execute(query, [doctorId, doctorId]);
    res.json(patients);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get doctor dashboard statistics
// @route   GET /api/doctors/stats
// @access  Private (Doctor only)
const getDoctorStats = async (req, res) => {
  try {
    // 1. Get Doctor ID from User ID
    const [doctor] = await db.execute('SELECT id FROM doctors WHERE user_id = ?', [req.user.id]);

    if (doctor.length === 0) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const doctorId = doctor[0].id;

    // 2. Get total appointments count
    const [totalResult] = await db.execute(
      'SELECT COUNT(*) as total FROM appointments WHERE doctor_id = ?',
      [doctorId]
    );

    // 3. Get today's appointments count
    const [todayResult] = await db.execute(
      `SELECT COUNT(*) as today FROM appointments 
       WHERE doctor_id = ? AND DATE(appointment_date) = CURDATE()`,
      [doctorId]
    );

    // 4. Get pending appointments count
    const [pendingResult] = await db.execute(
      `SELECT COUNT(*) as pending FROM appointments 
       WHERE doctor_id = ? AND status = 'pending'`,
      [doctorId]
    );

    res.json({
      totalAppointments: totalResult[0].total,
      todaySchedule: todayResult[0].today,
      pendingRequests: pendingResult[0].pending,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get profile for the logged-in doctor
// @route   GET /api/doctors/profile
// @access  Private (Doctor only)
const getDoctorProfile = async (req, res) => {
  try {
    const [doctors] = await db.execute(`
      SELECT d.*, u.name, u.email 
      FROM doctors d 
      JOIN users u ON d.user_id = u.id 
      WHERE u.id = ?
    `, [req.user.id]);

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    res.json(doctors[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  getDoctorPatients,
  getDoctorStats,
  getDoctorProfile
};
