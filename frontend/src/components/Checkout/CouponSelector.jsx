// CouponSelector.js
import React from "react";

const CouponSelector = ({ coupons, selectedCoupon, setSelectedCoupon, applyPromoCode }) => {
  return (
    <div>
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
          {coupons.map((coupon) => (
            <option key={coupon.coupon_id} value={coupon.coupon_id}>
              {coupon.code} - ${coupon.discount_value} off (Min order: ${coupon.min_order_amount})
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
    </div>
  );
};

export default CouponSelector;