const express = require('express');
const router = express.Router();
const { getPatientStats, getPatientProfile } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getPatientStats);
router.get('/profile', protect, getPatientProfile);

module.exports = router;
