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

module.exports = {
  getDoctors,
  getDoctorById,
};
