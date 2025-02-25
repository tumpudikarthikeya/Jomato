import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import Snackbar from "@mui/material/Snackbar"; // Import Snackbar
import Alert from "@mui/material/Alert"; // Import Alert

const Checkout = () => {
  const [discount, setDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [cart, setCart] = useState([]); // Store cart state locally
  const [shipping, setShipping] = useState(30.0); // Default shipping cost
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity

  // Get cart data from sessionStorage
  const getCartFromSessionStorage = () =>
    JSON.parse(sessionStorage.getItem("cart")) || [];

  // Initialize cart state from sessionStorage on component mount
  useEffect(() => {
    const initialCart = getCartFromSessionStorage();
    setCart(initialCart);
  }, []);

  const updateCartInSessionStorage = (updatedCart) => {
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddItem = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (item) => item.item_id === product.item_id
    );
    if (index !== -1) {
      updatedCart[index].qty += 1; // Increase the quantity
    } else {
      updatedCart.push({ ...product, qty: 1 }); // Add new item if not found
    }
    setCart(updatedCart); // Update cart state
    updateCartInSessionStorage(updatedCart); // Save updated cart to sessionStorage
  };

  const handleRemoveItem = (product) => {
    const updatedCart = [...cart]; // Make a copy of the cart
    const index = updatedCart.findIndex(
      (item) => item.item_id === product.item_id
    ); // Find the item index

    if (index !== -1) {
      if (updatedCart[index].qty > 1) {
        // Decrease the quantity by 1
        updatedCart[index].qty -= 1;
      } else {
        // If the quantity is 1, remove the item from the cart
        updatedCart.splice(index, 1);
      }
    }

    setCart(updatedCart); // Update cart state
    updateCartInSessionStorage(updatedCart); // Save updated cart to sessionStorage
  };

  const applyPromoCode = () => {
    if (selectedCoupon) {
      const discountValue = selectedCoupon.discount_value; // Flat discount amount

      // Check if grand total is greater than or equal to the min_order_amount
      let updatedDiscount = 0;
      let updatedShipping = shipping;

      let subtotal = 0;
      cart.forEach((item) => {
        subtotal += item.price * item.qty;
      });

      const grandTotal = subtotal + updatedShipping;

      if (grandTotal >= selectedCoupon.min_order_amount) {
        updatedDiscount = discountValue; // Apply discount if conditions are met
      } else {
        alert(
          `Minimum order amount is $${selectedCoupon.min_order_amount} for this coupon.`
        );
      }

      if (selectedCoupon.code === "FREESHIP") {
        updatedShipping = 0; // Set shipping cost to zero for "FREESHIP" coupon
      }

      setDiscount(updatedDiscount); // Set the discount value
      setShipping(updatedShipping); // Set updated shipping cost
    } else {
      alert("Please select a valid coupon.");
    }
  };

  const clearCart = () => {
    setCart([]); // Clear cart state
    sessionStorage.removeItem("cart"); // Clear sessionStorage
  };

  const EmptyCart = () => (
    <div className="container mx-auto text-center py-20">
      <h4 className="text-2xl font-semibold mb-4">Your Cart is Empty</h4>
      <button
        onClick={() => window.history.back()}
        className="btn btn-outline-dark mx-4 text-blue-600 hover:bg-blue-100 px-6 py-2 border border-blue-600 rounded"
      >
        <i class Name="fa fa-arrow-left"></i> Add something
      </button>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    // Grand total calculation with discount and shipping
    const grandTotal = subtotal + shipping - discount;

    const handlePlaceOrder = async () => {
      const orderItems = cart.map((item) => ({
        item_id: item.item_id,
        quantity: item.qty,
        item_price: item.price,
      }));

      const orderData = {
        userId: sessionStorage.getItem("user_id"), // Assuming user_id is stored in sessionStorage
        restaurantId: JSON.parse(sessionStorage.getItem("cart"))[0]
          .restaurant_id, // Assuming restaurant_id is stored in sessionStorage
        totalAmount: grandTotal,
        status: "Pending",
        paymentStatus: "Unpaid",
        deliveryAddress: sessionStorage.getItem("delivery_address"), // Assuming delivery address is stored in sessionStorage
        orderItems,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/cart",
          orderData
        );
        if (response.data.orderId) {
          // sessionStorage.setItem("order_id", response.data.orderId);
          // setOrderId(response.data.orderId) // Store the order_id in sessionStorage
          setSnackbarMessage("Order placed successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setTimeout(() => {
            window.location.href = `/order/track/${response.data.orderId}`;
          }, 2000);
          // window.location.href = `/order/track/${response.data.orderId}`;
        }
      } catch (error) {
        console.error("Error placing order:", error);
        setSnackbarMessage("An error occurred while placing the order. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    return (
      <section className="py-8 ">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h5 className="text-xl font-semibold mb-4">Item List</h5>
              {cart.map((item) => (
                <div
                  key={item.item_id}
                  className="flex items-center border-b py-4"
                >
                  <div className="w-1/4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-1/2 pl-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="w-1/4 text-center">
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="mx-4">{item.qty}</span>
                    <button
                      onClick={() => handleAddItem(item)}
                      className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                    <p className="mt-2 font-semibold">
                      ${Math.round(item.price * item.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h5 className="text-xl font-semibold mb-4">Payment Method</h5>
              <button className="w-full text-center bg-gray-200 text-gray-800 py-2 rounded-md mb-4 hover:bg-gray-300">
                + Add Payment Method
              </button>
              <h5 className="text-xl font-semibold mb-4">Select Coupon</h5>
              <div className="flex items-center mb-4">
                <select
                  value={selectedCoupon ? selectedCoupon.coupon_id : ""}
                  onChange={(e) => {
                    const coupon = coupons.find(
                      (c) => c.coupon_id.toString() === e.target.value
                    );
                    setSelectedCoupon(coupon);
                  }}
                  className="border px-4 py-2 w-full rounded-lg"
                >
                  <option value="">Select Coupon</option>
                  {coupons.map((coupon ) => (
                    <option key={coupon.coupon_id} value={coupon.coupon_id}>
                      {coupon.code} - ${coupon.discount_value} off (Min order: $
                      {coupon.min_order_amount})
                    </option>
                  ))}
                </select>
                <button
                  onClick={applyPromoCode}
                  className="px-4 py-2 bg-[#ff5200] ml-1 text-white rounded-lg hover:bg-[#ff6b00] cursor-pointer"
                >
                  Apply
                </button>
              </div>
              <h5 className="text-xl font-semibold mb-4">Order Summary</h5>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Items ({totalItems})</span>
                  <span>${Math.round(subtotal)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${shipping}</span>
                </li>
                <li className="flex justify-between">
                  <span>Coupon Discount</span>
                  <span>-${Math.round(discount)}</span>
                </li>
                <li className="flex justify-between font-semibold">
                  <span>Grand Total</span>
                  <span>${Math.round(grandTotal)}</span>
                </li>
              </ul>
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full text-center bg-[#ff5200] font-bold text-white py-3 rounded-md cursor-pointer hover:bg-[#ff6b00]"
              >
                Place Order
              </button>
              <button
                onClick={clearCart}
                className="mt-4 w-full text-center font-medium text-[#ff5200] py-3 rounded-md border border-[#ff5200] cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  useEffect(() => {
    // Fetch coupons on component mount
    const fetchCoupons = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/coupons");
        const data = await response.json();
        setCoupons(data.coupons);
      } catch (err) {
        console.error("Error fetching coupons:", err);
      }
    };

    fetchCoupons();
  }, []);

  // Reset shipping cost to $30 whenever the selected coupon changes
  useEffect(() => {
    setShipping(30.0); // Reset shipping to $30
  }, [selectedCoupon]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      {cart.length > 0 ? <ShowCart /> : <EmptyCart />}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;