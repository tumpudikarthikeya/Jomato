// Checkout.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CartItem from "../components/Checkout/CartItem"; // Import CartItem
import CartSummary from "../components/Checkout/CartSummary"; // Import CartSummary
import CouponSelector from "../components/Checkout/CouponSelector"; // Import CouponSelector

const Checkout = () => {
  const [discount, setDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState(30.0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const getCartFromSessionStorage = () =>
    JSON.parse(sessionStorage.getItem("cart")) || [];

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
      updatedCart[index].qty += 1;
    } else {
      updatedCart.push({ ...product, qty: 1 });
    }
    setCart(updatedCart);
    updateCartInSessionStorage(updatedCart);
  };

  const handleRemoveItem = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (item) => item.item_id === product.item_id
    );

    if (index !== -1) {
      if (updatedCart[index].qty > 1) {
        updatedCart[index].qty -= 1;
      } else {
        updatedCart.splice(index, 1);
      }
    }

    setCart(updatedCart);
    updateCartInSessionStorage(updatedCart);
  };

  const applyPromoCode = () => {
    if (selectedCoupon) {
      const discountValue = selectedCoupon.discount_value;
      let updatedDiscount = 0;
      let updatedShipping = shipping;

      let subtotal = 0;
      cart.forEach((item) => {
        subtotal += item.price * item.qty;
      });

      const grandTotal = subtotal + updatedShipping;

      if (grandTotal >= selectedCoupon.min_order_amount) {
        updatedDiscount = discountValue;
      } else {
        alert(`Minimum order amount is $${selectedCoupon.min_order_amount} for this coupon.`);
      }

      if (selectedCoupon.code === "FREESHIP") {
        updatedShipping = 0;
      }

      setDiscount(updatedDiscount);
      setShipping(updatedShipping);
    } else {
      alert("Please select a valid coupon.");
    }
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem("cart");
  };

  const EmptyCart = () => (
    <div className="container mx-auto text-center py-20">
      <h4 className="text-2xl font-semibold mb-4">Your Cart is Empty</h4>
      <button
        onClick={() => window.history.back()}
        className="btn btn-outline-dark mx-4 text-blue-600 hover:bg-blue-100 px-6 py-2 border border-blue-600 rounded"
      >
        <i className="fa fa-arrow-left"></i> Add something
      </button>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((item) => {
      subtotal += item .price * item.qty;
      totalItems += item.qty;
    });

    const grandTotal = subtotal + shipping - discount;

    const handlePlaceOrder = async () => {
      const orderItems = cart.map((item) => ({
        item_id: item.item_id,
        quantity: item.qty,
        item_price: item.price,
      }));

      const orderData = {
        userId: sessionStorage.getItem("user_id"),
        restaurantId: JSON.parse(sessionStorage.getItem("cart"))[0].restaurant_id,
        totalAmount: grandTotal,
        status: "Pending",
        paymentStatus: "Unpaid",
        deliveryAddress: sessionStorage.getItem("delivery_address"),
        orderItems,
      };

      try {
        const response = await axios.post("http://localhost:5000/api/cart", orderData);
        if (response.data.orderId) {
          setSnackbarMessage("Order placed successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setTimeout(() => {
            window.location.href = `/order/track/${response.data.orderId}`;
          }, 2000);
        }
      } catch (error) {
        console.error("Error placing order:", error);
        setSnackbarMessage("An error occurred while placing the order. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    return (
      <section className="py-8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h5 className="text-xl font-semibold mb-4">Item List</h5>
              {cart.map((item) => (
                <CartItem
                  key={item.item_id}
                  item={item}
                  onAddItem={handleAddItem}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
          </div>
          <div>
            <CouponSelector
              coupons={coupons}
              selectedCoupon={selectedCoupon}
              setSelectedCoupon={setSelectedCoupon}
              applyPromoCode={applyPromoCode}
            />
            <CartSummary
              totalItems={totalItems}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              grandTotal={grandTotal}
              handlePlaceOrder={handlePlaceOrder}
              clearCart={clearCart}
            />
          </div>
        </div>
      </section>
    );
  };

  useEffect(() => {
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

  useEffect(() => {
    setShipping(30.0);
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