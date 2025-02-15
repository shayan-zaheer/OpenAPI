import React from "react";

import HeroDetails from "./HeroDetails";

const Hero = () => {
  return (
    <div className=" w-8/12  h-96 relative mx-auto md:rounded-2xl  top-6">
      <div className="w-full min-h-full flex items-center justify-center absolute inset-0 bg-cover bg-center  rounded-2xl">
        <img
          src={"/HeroBackground.png"}
          alt="Gemstone"
          fill
          className="object-cover rounded-2xl w-full h-full"
        />
      </div>
      <div className="w-full min-h-full absolute bg-black bg-opacity-60 inset-0 md:rounded-2xl ">
        <div className="w-full min-h-full flex flex-col  px-10 max-sm:px-5 lg:flex-row lg:p-10">
          <HeroDetails />
        </div>
      </div>
    </div>
  );
};

export default Hero;
