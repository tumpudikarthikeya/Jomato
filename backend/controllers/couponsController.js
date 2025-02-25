// controllers/couponsController.js

const { supabase } = require('../config/db');

// Controller for fetching coupons
const getCoupons = async (req, res) => {
  try {
    // Fetch all coupons
    const { data: coupons, error } = await supabase
      .from('coupons')
      .select('*');

    if (error) {
      throw error;
    }

    if (!coupons.length) {
      return res.status(404).json({ error: 'No coupons found' });
    }

    // Send the coupons as a response
    res.json({ coupons });
  } catch (err) {
    console.error('Error fetching coupons:', err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getCoupons };