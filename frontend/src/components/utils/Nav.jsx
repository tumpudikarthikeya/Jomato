import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

const Nav = () => {
  const clearSession = () => {
    sessionStorage.clear();
    window.location.replace("/signin");
  };

  const user_id = sessionStorage.getItem("user_id") || null;


  // State to manage the side drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="bg-[#ff5200] flex justify-between items-center px-4 lg:px-40 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.replace("/")}>
        <img src="/logo.svg" alt="" className="h-12 border w-12 p-2 border-white rounded-2xl" />
        <p className="text-3xl text-white font-bold">Jomato</p>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="md:hidden">
        <button onClick={toggleDrawer} className="text-white cursor-pointer">
          <FaBars size={24} />
        </button>
      </div>

      {/* Side Drawer */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={toggleDrawer}></div>
      <div className={`fixed left-0 top-0 w-64 bg-white h-full shadow-lg transition-transform duration-300 transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center p-4 bg-[#ff5200] text-white">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleDrawer}>
            <CgClose size={24} className="cursor-pointer" />
          </button>
        </div>
        <div className="flex flex-col p-4">
          {!user_id ? (
            <>
              <Link to={"/signin"} className="py-2 text-lg text-[#ff5200] hover:text-[#ff6b00] cursor-pointer">SignIn</Link>
              <Link to={"/signup"} className="py-2 text-lg text-[#ff5200] hover:text-[#ff6b00] cursor-pointer">SignUp</Link>
            </>
          ) : (
            <>
              <Link to={"/checkout"} className="py-2 text-lg text-[#ff5200] hover:text-[#ff6b00] cursor-pointer" onClick={toggleDrawer}>Cart</Link>
              <button className="py-2 text-lg text-red-500 hover:text-red-700 cursor-pointer" onClick={clearSession}>LogOut</button>
            </>
          )}
        </div>
      </div>

      {/* Cart Icon */}
      <div className="hidden md:flex items-center gap-5">
        <button className="flex items-center space-x-2 text-[#ff5200] p-2 rounded-lg">
            <Link to="/checkout">
              <FaCartShopping className="font-bold text-2xl text-white" />
            </Link>
        </button>
              <button className="py-2 text-white border text-lg px-6 rounded-xl cursor-pointer" onClick={clearSession}>LogOut</button>
      </div>
    </div>
  );
};

export default Nav;