const express = require('express');
const router = express.Router();
const { registerPatient, registerDoctor, loginUser, deleteUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register/patient', registerPatient);
router.post('/register/doctor', registerDoctor);
router.post('/login', loginUser);
router.delete('/me', protect, deleteUser);

module.exports = router;
