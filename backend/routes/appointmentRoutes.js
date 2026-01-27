const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment, updateAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointment);
router.put('/:id', protect, updateAppointment);

module.exports = router;
