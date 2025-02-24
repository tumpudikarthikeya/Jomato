import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, setCart } from "../redux/reducers/cartReducer"; // Import addItem action
import { Link } from "react-router-dom";

const Checkout = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  
  const cart = useSelector((state) => state.cart.cart); // Get cart state from Redux
  const dispatch = useDispatch();

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddItem = (product) => {
    dispatch(addItem(product)); // Dispatch addItem action
  };

  const handleRemoveItem = (product) => {
    dispatch(removeItem(product)); // Dispatch removeItem action
  };

  const applyPromoCode = () => {
    if (promoCode === "helloID") {
      setDiscount(0.11); // 11% discount
    } else {
      setDiscount(0);
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    dispatch(setCart([])); // Clear the Redux cart
  };

  const EmptyCart = () => (
    <div className="container mx-auto text-center py-20">
      <h4 className="text-2xl font-semibold mb-4">Your Cart is Empty</h4>
      <Link to="/restaurants/2" className="btn  btn-outline-dark mx-4 text-blue-600 hover:bg-blue-100 px-6 py-2 border border-blue-600 rounded">
        <i className="fa fa-arrow-left"></i>
         Add something
      </Link>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    cart.forEach((item) => {
      subtotal += item.price * item.qty; // Multiply price by qty
      totalItems += item.qty;
    });

    const discountAmount = subtotal * discount;
    const grandTotal = subtotal + shipping - discountAmount;

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
              <h5 className="text-xl font-semibold mb-4">Add Promo Code</h5>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="border px-4 py-2 w-full rounded-md"
                />
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

  return (
    <div className="container mx-auto py-8">
      {cart.length > 0 ? <ShowCart /> : <EmptyCart />}
    </div>
  );
};

export default Checkout;
