// const { supabase } = require('../config/db');

// const menuController = {
//   // Get restaurant menu
//   async getMenuItems(req, res) {
//     try {
//       const { restaurantId } = req.params;
//       const { data, error } = await supabase
//         .from('menu_items')
//         .select('*')
//         .eq('restaurant_id', restaurantId);

//       if (error) throw error;
//       res.json(data);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   }
// };