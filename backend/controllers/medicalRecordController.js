const db = require('../config/db');

// @desc    Add a medical record for a patient
// @route   POST /api/medical-records
// @access  Private (Doctor only)
const addMedicalRecord = async (req, res) => {
    const { patient_id, appointment_id, diagnosis, prescription, treatment_plan } = req.body;

    if (!patient_id || !appointment_id) {
        return res.status(400).json({ message: 'Please include patient_id and appointment_id' });
    }

    try {
        // Get doctor record for current user
        const [doctor] = await db.execute('SELECT id FROM doctors WHERE user_id = ?', [req.user.id]);
        if (doctor.length === 0) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }
        const doctor_id = doctor[0].id;

        // Verify appointment exists and belongs to this doctor and patient
        const [appointments] = await db.execute(
            'SELECT id FROM appointments WHERE id = ? AND doctor_id = ? AND patient_id = ?',
            [appointment_id, doctor_id, patient_id]
        );

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'Matching appointment not found' });
        }

        // Insert record
        await db.execute(
            'INSERT INTO medical_records (patient_id, doctor_id, appointment_id, diagnosis, prescription, treatment_plan) VALUES (?, ?, ?, ?, ?, ?)',
            [patient_id, doctor_id, appointment_id, diagnosis || '', prescription || '', treatment_plan || '']
        );

        res.status(201).json({ message: 'Medical record added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get patient medical history
// @route   GET /api/medical-records/patient/:id
// @access  Private
const getPatientHistory = async (req, res) => {
    try {
        const patient_id = req.params.id;

        // Authorization check: User can view their own history, or a doctor can view it
        if (req.user.role === 'patient' && req.user.id != patient_id) {
            return res.status(403).json({ message: 'Not authorized to view this history' });
        }

        const [records] = await db.execute(`
      SELECT m.*, u.name as doctor_name, d.specialty
      FROM medical_records m
      JOIN doctors d ON m.doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      WHERE m.patient_id = ?
      ORDER BY m.created_at DESC
    `, [patient_id]);

        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addMedicalRecord,
    getPatientHistory
};
