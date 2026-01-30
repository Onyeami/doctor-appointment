const express = require('express');
const router = express.Router();
const { getAppointments, getAppointmentById, createAppointment, updateAppointment, rescheduleAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAppointments);
router.get('/:id', protect, getAppointmentById);
router.post('/', protect, createAppointment);
router.put('/:id', protect, updateAppointment);
router.put('/:id/reschedule', protect, rescheduleAppointment);

module.exports = router;
