import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
 
const HeroSection = () => {
  const [address, setAddress] = useState("");
 
  return (
    <div className="relative w-full bg-[#EDF3FC] text-gray-900 h-screen flex flex-col">
      {/* Hero Section */}
      <div className=" flex-4 mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center">
        {/* Text Section */} 
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold leading-tight">
            Many Restaurants in <span className="text-red-500">1 Order</span>
          </h2>
          <p className="text-gray-600 mt-4">
            Order from different restaurants and get them all in one delivery.
          </p>
 
          {/* Address Input */}
          <div className="mt-6 flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
            <FaMapMarkerAlt className="text-blue-600 mr-2" />
            <input
              type="text"
              placeholder="Enter Delivery Address"
              className="flex-1 outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              ➝
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            <a href="#" className="text-red-500">
              Sign in
            </a>{" "}
            for your recent address
          </p>
 
     
        </div>
 
        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0 ">
          <img
            src="biryani.png"
            alt="Food Delivery Illustration"
            className="w-180 z-1"
          />
        </div>
      </div>
    </div>
  );
};
 
export default HeroSection;