import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import DisplayCard from "./DisplayCard";
import { useState } from "react";

const HeroSection = () => {
  const [selectedCity, setSelectedCity] = useState("");
  return (
    <div className="bg-[#ff5200] w-full h-screen flex flex-col gap-30 items-center relative">
      <img
        src="/Veggies_new.png"
        alt=""
        className="absolute h-130 left-0 top-30 lg:visible invisible"
      />
      <img
        src="/Sushi_replace.png"
        alt=""
        className="absolute h-130 right-0 top-30 lg:visible invisible"
      />
      <div className="w-full flex flex-col items-center place-content-center mt-10 gap-15">
        <p className="text-4xl lg:text-5xl font-bold text-white w-1/2 text-center">
          Order food & groceries. Discover best restaurants. Jomato it!
        </p>

        <div className="flex w-1/2 flex-wrap gap-5 items-center">
          <div className="flex items-center py-4 gap-2 bg-white px-2 rounded-xl">
            <FaLocationDot className="text-3xl text-[#ff5200]" />
            <select
          className="bg-white px-2 outline-none"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >     <option value="" disabled>Select your city</option>
              <option value="chennai">Chennai</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="vizag">Vizag</option>
              <option value="bangalore">Bangalore</option>
              <option value="pune">Pune</option>
            </select>
          </div>

          <a className="flex lg:w-2/3 items-center py-4 gap-1 bg-white px-2 rounded-xl" href="#search">
            <input
              type="text"
              placeholder="Search for restaurants and food"
              className="bg-white w-full px-2 outline-none"
            />
            <IoIosSearch className="text-3xl pr-1 text-gray-500" />
          </a>
        </div>
      </div>

      <div className="flex gap-15 lg:visible invisible">
        <DisplayCard
          title={"Gourmet Bowl"}
          desc={"Healthy & delicious"}
          code={"BOWL"}
          discount={"50"}
          img_url={"bowl1.png"}
        />
        <DisplayCard
          title={"Daily Specials"}
          desc={"Fresh meals"}
          code={"DAILY"}
          discount={"30"}
          img_url={"bowl2.png"}
        />
        <DisplayCard
          title={"Dine-In Delight"}
          desc={"Exclusive offers"}
          code={"DINE"}
          discount={"40"}
          img_url={"bowl3.png"}
        />
        <DisplayCard
          title={"Pizza Treats"}
          desc={"Amazing discounts"}
          code={"PIZZA"}
          discount={"20"}
          img_url={"bowl4.png"}
        />
      </div>
    </div>
  );
};

export default HeroSection;