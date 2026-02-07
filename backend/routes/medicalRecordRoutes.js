const express = require('express');
const router = express.Router();
const { addMedicalRecord, getPatientHistory } = require('../controllers/medicalRecordController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addMedicalRecord);
router.get('/patient/:id', protect, getPatientHistory);

module.exports = router;
