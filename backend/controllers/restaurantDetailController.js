//controllers/restaurantsController.js

const { supabase } = require('../config/db');

// Controller for getting a restaurant by ID with menu items
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params; // Get the restaurant ID from the route params

    // Fetch the restaurant data by ID
    const { data: restaurantData, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('restaurant_id', id)
      .single(); // Use .single() to get only one result

    if (restaurantError) {
      throw restaurantError;
    }

    if (!restaurantData) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Fetch the menu items related to the restaurant
    const { data: menuItems, error: menuError } = await supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', id);

    if (menuError) {
      throw menuError;
    }

    // Combine the restaurant data and menu items
    const response = {
      restaurant: restaurantData,
      menuItems: menuItems,
    };

    // Send the combined data as a response
    res.json(response);
  } catch (err) {
    console.error('Error fetching restaurant data:', err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getRestaurantById };