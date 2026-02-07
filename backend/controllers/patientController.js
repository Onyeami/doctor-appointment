const db = require('../config/db');

// @desc    Get patient dashboard statistics
// @route   GET /api/patients/stats
// @access  Private (Patient only)
const getPatientStats = async (req, res) => {
    try {
        const patientId = req.user.id;

        // 1. Get upcoming appointments count (future appointments)
        const [upcomingResult] = await db.execute(
            `SELECT COUNT(*) as upcoming FROM appointments 
       WHERE patient_id = ? AND appointment_date >= NOW() AND status != 'cancelled'`,
            [patientId]
        );

        // 2. Get past visits count (past appointments that were confirmed)
        const [pastResult] = await db.execute(
            `SELECT COUNT(*) as past FROM appointments 
       WHERE patient_id = ? AND appointment_date < NOW()`,
            [patientId]
        );

        // 3. Messages count (placeholder - can be implemented later)
        const messagesCount = 0;

        res.json({
            upcomingAppointments: upcomingResult[0].upcoming,
            pastVisits: pastResult[0].past,
            messages: messagesCount,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPatientProfile = async (req, res) => {
    try {
        const [patient] = await db.execute(
            'SELECT id, name, email, created_at FROM users WHERE id = ?',
            [req.user.id]
        );

        if (patient.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getPatientStats,
    getPatientProfile
};
