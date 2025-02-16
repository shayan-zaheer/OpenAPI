"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeroDetails = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col  max-sm:w-full sm:w-full md:w-full pr-5 max-md:pt-10 md:pt-5"
    >
      <h1 className="text-white text-6xl sm:text-6xl md:text-7xl font-semibold lg:w-full max-sm:w-full sm:w-11/12 max-sm:text-4xl tracking-wider ">
        {" "}
        Discover & Share{" "}
        <span className="bg-gradient-to-r from-[#FF0044] to-[#00D4FF]  animate-gradient text-transparent bg-clip-text ">
          APIs
        </span>{" "}
        with Ease
      </h1>
      <div className=" my-4">
        <h1 className="text-slate-300 w-11/12 sm:text-lg md:text-xl font-semibold lg:w-10/12">
          Find free and paid APIs in seconds. Explore, upload, and manage APIs
          effortlessly.
        </h1>
      </div>
      <div className="flex gap-x-10 max-sm:gap-x-5">
        <Link to={"/Allapis"}>
          <button className="relative px-6 py-3 font-semibold text-white bg-transparent border border-white hover:border-transparent overflow-hidden group rounded-sm">
            <span className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
            <span className="relative z-10 text-white">Explore APIs</span>
          </button>
        </Link>
        {user && (
          <Link to={"/upload"}>
            <button className="relative px-6 py-3 font-semibold text-white bg-transparent border border-white hover:border-transparent overflow-hidden group rounded-sm ">
              <span className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
              <span className="relative z-10 text-white">Upload APIs</span>
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default HeroDetails;
