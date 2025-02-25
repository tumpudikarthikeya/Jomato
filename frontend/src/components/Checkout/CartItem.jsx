// CartItem.js
import React from "react";

const CartItem = ({ item, onAddItem, onRemoveItem }) => {
  return (
    <div className="flex items-center border-b py-4">
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
          onClick={() => onRemoveItem(item)}
          className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200"
        >
          <i className="fas fa-minus"></i>
        </button>
        <span className="mx-4">{item.qty}</span>
        <button
          onClick={() => onAddItem(item)}
          className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200"
        >
          <i className="fas fa-plus"></i>
        </button>
        <p className="mt-2 font-semibold">
          ${Math.round(item.price * item.qty)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;