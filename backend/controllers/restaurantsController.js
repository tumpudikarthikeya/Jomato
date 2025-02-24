const { supabase } = require('../config/db');
 
const getRestaurants = async (req, res) => {
    try {
      const { page = 1, pageSize = 10, search = "", rating = 0 } = req.query;
 
      const pageInt = parseInt(page);
      const pageSizeInt = parseInt(pageSize);
 
      // Building the query with filtering logic
      let query = supabase.from('restaurants').select('*', { count: 'exact' });
 
      if (search) {
        query = query.ilike('name', `%${search}%`); // Searching restaurants by name
      }
 
      if (rating > 0) {
        query = query.gte('rating', rating); // Filtering restaurants by rating
      }
 
      // Apply pagination
      query = query.range((pageInt - 1) * pageSizeInt, pageInt * pageSizeInt - 1);
 
      const { data, error, count } = await query;
 
      if (error) throw error;
 
      const totalPages = Math.ceil(count / pageSizeInt);
 
      res.json({
        restaurants: data,
        totalPages,
      });
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      res.status(400).json({ error: err.message });
    }
  };
 
 
 
 
const searchRestaurants = async (req, res) => {
    try {
      const { query, page = 1, pageSize = 10 } = req.query; // Get search query and pagination params
 
      // If no query is provided, return a bad request error
      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }
 
      const pageInt = parseInt(page);
      const pageSizeInt = parseInt(pageSize);
 
      // Query restaurants with search functionality
      const { data, error, count } = await supabase
        .from('restaurants')
        .select('*', { count: 'exact' })
        .ilike('name', `%${query}%`) // Perform case-insensitive search in the 'name' field
        .or(`cuisine.ilike.%${query}%,rating.ilike.%${query}%`) // You can add more fields like 'cuisine' and 'rating' for search
        .range((pageInt - 1) * pageSizeInt, pageInt * pageSizeInt - 1); // Set the range for pagination
 
      if (error) {
        throw error;
      }
 
      // Calculate total pages
      const totalPages = Math.ceil(count / pageSizeInt);
 
      // Send response with search results and total pages
      res.json({
        restaurants: data,
        totalPages,
      });
    } catch (err) {
      console.error('Error searching restaurants:', err);
      res.status(400).json({ error: err.message });
    }
  };
 
 
// Controller for getting a restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
      const { id } = req.params; // Get the restaurant ID from the route params
 
      // Fetch the restaurant by ID
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('restaurant_id', id)
        .single(); // Use .single() to get only one result
 
      if (error) {
        throw error;
      }
 
      if (!data) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
 
      // Send the restaurant data as response
      res.json(data);
    } catch (err) {
      console.error('Error fetching restaurant:', err);
      res.status(400).json({ error: err.message });
    }
  };
 
  module.exports = { getRestaurants, searchRestaurants, getRestaurantById };
