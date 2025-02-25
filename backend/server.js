// server.js
const express = require('express');
const cors = require('cors');
const { supabase } = require('./config/db');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});


app.get("/test",async (req,res)=>{
        try {
          const { data, error } = await supabase
            .from('menu_items')
            .select('*');
    
          if (error) throw error;
          res.json(data);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
})

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/restaurantsDetails', require('./routes/restaurantDetail'));
 app.use('/api/coupons', require('./routes/couponsRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/cart', require('./routes/cart'));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(config.node_env === 'development' && { stack: err.stack })
    }
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ error: { message: 'Route not found' } });
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});