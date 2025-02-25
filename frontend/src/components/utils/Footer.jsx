import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#f0f0f5]  px-3 lg:px-40 py-20">
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <img
              src="logo.svg"
              alt=""
              className="h-12 w-12 p-2 bg-[#ff5200] rounded-2xl"
            />
            <p className="text-3xl font-bold text-[#ff5200]">Jomato</p>
          </div>
          <p className="text-lg text-gray-600 mt-4">
            Your Favorite Dishes, All in One Place!
          </p>{" "}
          {/* Slogan */}
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff5200]"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff5200]"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff5200]"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
      <div className="h-1 bg-gray-600 my-10"></div>
    </div>
  );
};

export default Footer;
