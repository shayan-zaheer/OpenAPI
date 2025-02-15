import React from "react";

import HeroDetails from "./HeroDetails";

const Hero = () => {
  return (
    <div className=" w-9/12  min-h-96 relative mx-auto md:rounded-2xl  top-12 max-md:w-full max-md:top-0 max-md:h-screen md:h-[410px] md:pt-6">
      <div className="w-full h-full flex items-center justify-center absolute inset-0 bg-cover bg-center blur-md  rounded-2xl ">
        <img
          src={"/HeroBackground.png"}
          alt="Gemstone"
          className="object-cover rounded-2xl w-full h-full"
        />
      </div>
      <div className="w-full h-full absolute bg-black bg-opacity-60 inset-0 md:rounded-2xl ">
        <div className="w-full h-full flex flex-col  px-10 max-sm:px-5 lg:flex-row lg:p-10 md:pt-4">
          <HeroDetails />
        </div>
      </div>
    </div>
  );
};

export default Hero;
