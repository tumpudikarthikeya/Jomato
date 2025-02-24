import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
 
const Tracking = () => {
  const { orderId: paramOrderId } = useParams(); // Get orderId from URL
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if (paramOrderId) {
      fetchOrderDetails(paramOrderId);
    }
  }, [paramOrderId]); // Fetch data when URL changes
 
  const fetchOrderDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`);
      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };
 
  const orderStatuses = [
    "Delivered",
    "In Progress",
    "Cancelled",
    "Pending"
  ];
 
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Image Placeholder */}
      <div className="w-full max-w-4xl h-68 bg-red-200 rounded-lg shadow-lg flex items-center justify-center">
        <img src="https://img.freepik.com/premium-vector/fast-delivery-mobile-ecommerce-concept-online-food-pizza-order-packaging-box-infographic_86047-129.jpg?w=1380" alt="Order" className="w-full h-full" />
        {/* <p className="text-gray-400">Image will be placed here</p> */}
      </div>
 
      {/* Order Details */}
      {loading && <p className="text-center text-lg mt-4">Please wait...</p>}
     
      {orderData && (
        <div className="w-full max-w-4xl mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-red-400">Order #{orderData.order.order_id}</h2>
          <p className="text-gray-600">Status: <span className="font-bold text-red-300">{orderData.order.status}</span></p>
          <p className="text-gray-600">Payment: <span className="font-bold text-red-300">{orderData.order.payment_status}</span></p>
          <p className="text-gray-600">Total: <span className="font-bold">${orderData.order.total_amount.toFixed(2)}</span></p>
 
          {/* Order Status Timeline */}
          <div className="mt-6 border-l-4 border-red-300 pl-6 space-y-4">
            {orderStatuses.map((status, index) => (
              <div key={index} className="relative flex items-start">
                <div className={`w-4 h-4 rounded-full ${status === orderData.order.status ? 'bg-red-300' : 'bg-gray-300'}`} />
                <div className="ml-4">
                  <p className={`font-semibold ${status === orderData.order.status ? 'text-red-300' : 'text-gray-500'}`}>{status}</p>
                  <p className="text-sm text-gray-400">{status === "Delivered" ? "Your order has been delivered." :
                    status === "In Progress" ? "Your order is currently being prepared." :
                    status === "Cancelled" ? "Your order has been cancelled." : "Your order is pending confirmation."}
                  </p>
                </div>
              </div>
            ))}
          </div>
 
          <h3 className="mt-6 font-semibold text-lg text-red-400">Ordered Items</h3>
          <ul className="mt-4 space-y-4">
            {orderData.items.map((item) => (
              <li key={item.order_item_id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={item.itemDetails.image_url} alt={item.itemDetails.name} className="w-16 h-16 rounded-md" />
                  <div>
                    <p className="font-medium text-lg">{item.itemDetails.name}</p>
                    <p className="text-sm text-gray-500">{item.itemDetails.description}</p>
                  </div>
                </div>
                <p className="font-semibold text-lg">x{item.quantity} - ${item.item_price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Tracking;