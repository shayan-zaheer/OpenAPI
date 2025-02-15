"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroDetails = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col  max-sm:w-full sm:w-full md:w-full pr-5"
    >
      <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-semibold lg:w-11/12 max-sm:w-full max-sm:text-4xl tracking-wider">
        {" "}
        Discover & Share
        <span className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient text-transparent bg-clip-text ">
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
        <button className="navbar-button" variant="outline">
          Explore APIs
        </button>
        <button className="navbar-button">Upload APIs</button>
      </div>
    </motion.div>
  );
};

export default HeroDetails;
