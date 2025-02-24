const express = require('express');
const { submitReview, getReviewsByRestaurant } = require('../controllers/reviewController');
 
const router = express.Router();
router.post('/', submitReview);
router.get('/:restaurant_id', getReviewsByRestaurant);
 
module.exports = router;