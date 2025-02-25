// routes/couponsRouter.js

const express = require('express');
const router = express.Router();
const couponsController = require('../controllers/couponsController');

// Route to fetch all coupons
router.get('/', couponsController.getCoupons);

module.exports = router;