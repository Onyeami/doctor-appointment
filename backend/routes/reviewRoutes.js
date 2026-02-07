const express = require('express');
const router = express.Router();
const { addReview, getDoctorReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addReview);
router.get('/doctor/:id', getDoctorReviews);

module.exports = router;
