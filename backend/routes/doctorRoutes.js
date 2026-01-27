const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, getDoctorPatients } = require('../controllers/doctorController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getDoctors);
router.get('/patients', protect, getDoctorPatients);
router.get('/:id', getDoctorById);

module.exports = router;
