const express = require('express');
const { createOrder, getOrderById } = require('../controllers/cartController');

const router = express.Router();

// Route to create a new order
router.post('/', async (req, res) => {
  const { userId, restaurantId, totalAmount, status, paymentStatus, deliveryAddress, orderItems } = req.body;

  try {
    const orderId = await createOrder(userId, restaurantId, totalAmount, status, paymentStatus, deliveryAddress, orderItems);
    res.status(201).json({ message: 'Order created successfully', orderId : orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get an order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { order, items } = await getOrderById(id);
    res.status(200).json({ order, items });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;