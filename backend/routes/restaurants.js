// routes/restaurantRoutes.js
const express = require('express');
const { getRestaurants,searchRestaurants,getRestaurantById } = require('../controllers/restaurantsController');
const router = express.Router();
 
// Define the route for fetching restaurants
router.get('/', getRestaurants);
router.get('/search', searchRestaurants);
router.get('/:id', getRestaurantById);
 
 
 
module.exports = router;
