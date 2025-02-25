const{ supabase} = require("../config/db");

exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
   
    // Fetch order details
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId)
        .single();
   
    if (orderError) return res.status(400).json({ error: orderError.message });
   
    // Fetch order items
    const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);
   
    if (itemsError) return res.status(400).json({ error: itemsError.message });
   
    // Fetch item details from menu_items table
    const itemIds = items.map(item => item.item_id);
    const { data: itemDetails, error: itemDetailsError } = await supabase
        .from('menu_items')
        .select('*')
        .in('item_id', itemIds);
   
    if (itemDetailsError) return res.status(400).json({ error: itemDetailsError.message });
   
    // Map item details to order items
    const itemsWithDetails = items.map(item => ({
        ...item,
        itemDetails: itemDetails.find(detail => detail.item_id === item.item_id) || null
    }));
   
    res.json({ order, items: itemsWithDetails });
};
 
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
 
    const validStatuses = ["Delivered", "In Progress", "Cancelled", "Pending"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }
 
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('order_id', orderId)
        .select()
        .single();
 
    if (error) return res.status(400).json({ error: error.message });
 
    res.json({ message: "Order status updated", order: data });
};