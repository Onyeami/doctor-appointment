const express = require('express');
const router = express.Router();
const { registerPatient, registerDoctor, loginUser } = require('../controllers/authController');

router.post('/register/patient', registerPatient);
router.post('/register/doctor', registerDoctor);
router.post('/login', loginUser);

module.exports = router;
