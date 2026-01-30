const express = require('express');
const router = express.Router();
const { getPatientStats } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getPatientStats);

module.exports = router;
