import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import DisplayCard from "./DisplayCard";

const Hero2 = () => {
  return (
    <div className="bg-[#ff5200] w-full h-[calc(100vh-200px)] flex flex-col gap-30 items-center  relative">
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
        alt=""
        className="absolute h-130 left-0 top-10"
      />
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
        alt=""
        className="absolute h-130 right-0 top-10"
      />
      <div className="w-full flex flex-col items-center place-content-center  mt-10 gap-15">
        <p className="text-5xl font-bold text-white w-1/2 text-center">
            Order food & groceries. Discover best restaurants. Swiggy it!
        </p>

        <div className="flex w-1/2 gap-5 items-center">
            <div className="flex w-1/3 items-center py-4 gap-2 bg-white px-2  rounded-xl">
            <FaLocationDot className="text-3xl text-[#ff5200]" />
            <input
                type="text"
                placeholder="Enter your delivery location"
                className="bg-white  px-2 outline-none"
            />
            </div>

            <div className="flex w-2/3 items-center py-4 gap-1 bg-white px-2  rounded-xl">
            <input
                type="text"
                placeholder="Search for restaruants and food"
                className="bg-white w-full px-2 outline-none"
            />
            <IoIosSearch className="text-3xl pr-1 text-gray-500" />
            </div>
        </div>
      </div>

      <div className="flex gap-15">
        <DisplayCard
          title={"Gourmet Bowl"}
          desc={"Healthy & delicious"}
          code={"BOWL"}
          discount={"50"}
          img_url={"bowl1.png"}
        />
        <DisplayCard
          title={"Daily Specials"}
          desc={"fresh meals"}
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

export default Hero2;
