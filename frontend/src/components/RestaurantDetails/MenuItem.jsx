import React, { useState } from "react";

const MenuItem = ({ item, onAddToCart }) => {
  const [added, setAdded] = useState(false); // State to track if item is added to cart

  const handleAddToCart = () => {
    onAddToCart(item);
    setAdded(true); // Change state to indicate item has been added
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <img
        src={item.image_url}
        alt={item.name}
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="flex items-center justify-between p-3">
        <div className="w-2/3">
          <h4 className="text-lg font-semibold mt-2">{item.name}</h4>
          <p className="text-gray-600 line-clamp-1">{item.description}</p>
        </div>
        <p className="text-xl text-orange-500">${item.price}</p>
      </div>
      <div className="mt-2 p-3 pb-5 font-medium flex justify-between items-center">
        <button
          className={`text-[#3A7D44] border-1 border-[#3A7D44] shadow-md py-1 px-3 rounded-md w-full cursor-pointer hover:bg-[#3A7D44] hover:text-white transition duration-200`}
          onClick={handleAddToCart}
        >
          {added ? "Added to Cart" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default MenuItem;