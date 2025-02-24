// routes/restaurantRoutes.js
const express = require('express');
const { getRestaurantById } = require('../controllers/restaurantDetailController');
const router = express.Router();

// Define the route for fetching restaurant data along with menu items
router.get('/:id', getRestaurantById);

module.exports = router;