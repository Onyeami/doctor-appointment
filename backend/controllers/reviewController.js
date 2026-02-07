const db = require('../config/db');

// @desc    Add a review for an appointment
// @route   POST /api/reviews
// @access  Private (Patient only)
const addReview = async (req, res) => {
    const { appointment_id, rating, comment } = req.body;

    if (!appointment_id || !rating) {
        return res.status(400).json({ message: 'Please include appointment_id and rating' });
    }

    try {
        // Verify appointment exists and belongs to the patient
        const [appointments] = await db.execute(
            'SELECT doctor_id FROM appointments WHERE id = ? AND patient_id = ?',
            [appointment_id, req.user.id]
        );

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'Appointment not found or not yours' });
        }

        const doctor_id = appointments[0].doctor_id;

        // Check if review already exists
        const [existing] = await db.execute(
            'SELECT id FROM reviews WHERE appointment_id = ?',
            [appointment_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: 'Rating already submitted for this appointment' });
        }

        // Insert review
        await db.execute(
            'INSERT INTO reviews (appointment_id, patient_id, doctor_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
            [appointment_id, req.user.id, doctor_id, rating, comment || '']
        );

        // Update doctor average rating
        const [avgResult] = await db.execute(
            'SELECT AVG(rating) as average FROM reviews WHERE doctor_id = ?',
            [doctor_id]
        );

        await db.execute(
            'UPDATE doctors SET rating = ? WHERE id = ?',
            [avgResult[0].average, doctor_id]
        );

        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get reviews for a doctor
// @route   GET /api/reviews/doctor/:id
// @access  Public
const getDoctorReviews = async (req, res) => {
    try {
        const [reviews] = await db.execute(`
      SELECT r.*, u.name as patient_name 
      FROM reviews r
      JOIN users u ON r.patient_id = u.id
      WHERE r.doctor_id = ?
      ORDER BY r.created_at DESC
    `, [req.params.id]);

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addReview,
    getDoctorReviews
};
