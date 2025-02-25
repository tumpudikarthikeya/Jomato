import React from "react";

const Nav = () => {
  return (
      <div className="bg-[#ff5200] flex justify-between  px-40 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="" className="h-12 border w-12 p-2 border-white rounded-2xl" />
        <p className="text-3xl text-white font-bold">Jomato</p>
        </div>
        <div className="text-lg flex gap-5">
            <button className="text-white px-8 py-2 border rounded-xl">SignIn</button>
            <button className="text-white font-medium px-8 py-2 bg-black rounded-xl">SignUp</button>

        </div>
    </div>
  );
};

export default Nav;
