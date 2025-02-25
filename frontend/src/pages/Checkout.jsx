import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [discount, setDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [cart, setCart] = useState([]); // Store cart state locally

  // Get cart data from localStorage
  const getCartFromLocalStorage = () => JSON.parse(localStorage.getItem("cart")) || [];
  
  // Initialize cart state from localStorage on component mount
  useEffect(() => {
    const initialCart = getCartFromLocalStorage();
    setCart(initialCart);
  }, []);

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddItem = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(item => item.item_id === product.item_id);
    if (index !== -1) {
      updatedCart[index].qty += 1; // Increase the quantity
    } else {
      updatedCart.push({ ...product, qty: 1 }); // Add new item if not found
    }
    setCart(updatedCart); // Update cart state
    updateCartInLocalStorage(updatedCart); // Save updated cart to localStorage
  };

  const handleRemoveItem = (product) => {
    const updatedCart = cart.filter(item => item.item_id !== product.item_id); // Remove the item
    setCart(updatedCart); // Update cart state
    updateCartInLocalStorage(updatedCart); // Save updated cart to localStorage
  };

  const applyPromoCode = () => {
    if (selectedCoupon) {
      const discountPercentage = selectedCoupon.discount_value;
      setDiscount(discountPercentage); // Set the discount percentage
    }
  };

  const clearCart = () => {
    setCart([]); // Clear cart state
    localStorage.removeItem("cart"); // Clear localStorage
  };

  const EmptyCart = () => (
    <div className="container mx-auto text-center py-20">
      <h4 className="text-2xl font-semibold mb-4">Your Cart is Empty</h4>
      <Link to="/restaurants/2" className="btn btn-outline-dark mx-4 text-blue-600 hover:bg-blue-100 px-6 py-2 border border-blue-600 rounded">
        <i className="fa fa-arrow-left"></i> Add something
      </Link>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    cart.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const discountAmount = (subtotal * discount) / 100; // Calculate discount
    const grandTotal = subtotal + shipping - discountAmount; // Calculate grand total

    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h5 className="text-xl font-semibold mb-4">Item List</h5>
              {cart.map((item) => (
                <div key={item.item_id} className="flex items-center border-b py-4">
                  <div className="w-1/4">
                    <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  </div>
                  <div className="w-1/2 pl-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="w-1/4 text-center">
                    <button onClick={() => handleRemoveItem(item)} className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200">
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="mx-4">{item.qty}</span>
                    <button onClick={() => handleAddItem(item)} className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200">
                      <i className="fas fa-plus"></i>
                    </button>
                    <p className="mt-2 font-semibold">${Math.round(item.price * item.qty)}</p>
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
                    const coupon = coupons.find(c => c.coupon_id.toString() === e.target.value);
                    console.log("Selected Coupon:", coupon);
                    setSelectedCoupon(coupon);
                  }}
                  className="border px-4 py-2 w-full rounded-md"
                >
                  <option value="">Select Coupon</option>
                  {coupons.map((coupon) => (
                    <option key={coupon.coupon_id} value={coupon.coupon_id}>
                      {coupon.code} - {coupon.discount_value}% off (Min order: ${coupon.min_order_amount})
                    </option>
                  ))}
                </select>
                <button onClick={applyPromoCode} className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                  Apply
                </button>
              </div>
              <h5 className="text-xl font-semibold mb-4">Order Summary</h5>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Products ({totalItems})</span>
                  <span>${Math.round(subtotal)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </li>
                <li className="flex justify-between">
                  <span>Coupon Discount</span>
                  <span>-${Math.round(discountAmount)}</span>
                </li>
                <li className="flex justify-between font-semibold">
                  <span>Grand Total</span>
                  <span>${Math.round(grandTotal)}</span>
                </li>
              </ul>
              <button
                className="mt-6 w-full text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
              >
                Place Order
              </button>
              <button
                onClick={clearCart}
                className="mt-4 w-full text-center bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
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
        console.log("Coupons fetched:", data.coupons); // Debugging
        setCoupons(data.coupons);
      } catch (err) {
        console.error("Error fetching coupons:", err);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className="container mx-auto py-8">
      {cart.length > 0 ? <ShowCart /> : <EmptyCart />}
    </div>
  );
};

export default Checkout;