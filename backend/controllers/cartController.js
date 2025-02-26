const{ supabase} = require("../config/db");

const createOrder = async (userId, restaurantId, totalAmount, status="success", paymentStatus="pending", deliveryAddress, orderItems) => {
    // Insert the order into the orders table
    const { data, error } = await supabase
      .from('orders')
      .insert(
        {
          user_id: userId,
          restaurant_id: restaurantId,
          total_amount: totalAmount,
          status,
          payment_status: paymentStatus,
          delivery_address: deliveryAddress,
        }
      )
      .select();
  
    // Check for errors during order creation
    if (error) {
      console.error('Error creating order:', error); // Log the error
      throw new Error(error.message);
    }
    // console.log(data);
    
    // Ensure order is created successfully
    // if (!order) {
    //   throw new Error('Order creation failed, no order returned.');
    // }
  
    const orderId = data[0].order_id;
  
    // Insert order items into the order_items table
    const orderItemsPromises = orderItems.map(item => {
      return supabase
        .from('order_items')
        .insert([
          {
            order_id: orderId,
            item_id: item.item_id,
            quantity: item.quantity,
            item_price: item.item_price,
          },
        ]);
    });
  
    // Wait for all order items to be inserted
    const results = await Promise.all(orderItemsPromises);
  
    // Check for errors during order items insertion
    const errors = results.filter(result => result.error);
    if (errors.length > 0) {
      console.error('Error inserting order items:', errors); // Log the errors
      throw new Error('Failed to insert one or more order items.');
    }
  
    return orderId;
  };

const getOrderById = async (orderId) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('order_id', orderId)
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  return { order, items };
};

module.exports = { createOrder, getOrderById };