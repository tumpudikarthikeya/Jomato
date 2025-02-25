// CartSummary.js
import React from "react";

const CartSummary = ({
  totalItems,
  subtotal,
  shipping,
  discount,
  grandTotal,
  handlePlaceOrder,
  clearCart,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
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
  );
};

export default CartSummary;