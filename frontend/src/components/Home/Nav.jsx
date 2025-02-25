import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import Badge from '@mui/material/Badge';

const Nav = () => {
  const clearSession = () => {
    sessionStorage.clear();
    window.location.replace("/signin");
  };

  const user_id = sessionStorage.getItem("user_id") || null;

  // State to hold the cart data
  const [cart, setCart] = useState(() => {
    // Load the cart from sessionStorage or set it as an empty array initially
    return JSON.parse(sessionStorage.getItem("cart")) || [];
  });

  // Function to add item to cart and update state & sessionStorage
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart); // Update state
    sessionStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist to sessionStorage
  };

  // Function to get the cart length
  const cartLength = cart.length;

  // This effect will update whenever the cart changes
  useEffect(() => {
    // Optionally, any additional logic to sync with other storage or side effects can go here.
  }, [cart]); // Trigger whenever cart state changes

  return (
    <div className="bg-[#ff5200] flex justify-between px-40 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.replace("/")}>
        <img src="/logo.svg" alt="" className="h-12 border w-12 p-2 border-white rounded-2xl" />
        <p className="text-3xl text-white font-bold">Jomato</p>
      </div>
      <div className="flex items-center gap-5">
        {!user_id ? (
          <div className="text-lg flex gap-5">
            <Link to={"/signin"} className="cursor-pointer">
              <button className="text-white px-8 py-2 border rounded-xl">SignIn</button>
            </Link>
            <Link to={"/signup"} className="cursor-pointer">
              <button className="text-white font-medium px-8 py-2 bg-black rounded-xl">SignUp</button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <button className="flex items-center space-x-2 text-[#ff5200] p-2 rounded-lg">
              <Badge badgeContent={cartLength} color="primary">
                <Link to="/checkout">
                  <FaCartShopping className="font-bold text-2xl text-white" />
                </Link>
              </Badge>
            </button>
            <button className="text-white px-8 py-2 border rounded-xl cursor-pointer" onClick={() => clearSession()}>
              LogOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
