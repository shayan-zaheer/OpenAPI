import React from "react";

const APIsCard = ({ api }) => {
  return (
    <div className=" w-52 h-72 bg-[#414848] rounded-lg">
      <div className="w-full h-[75%] flex items-center justify-center">
        <img
          src={api.image}
          alt={api.title}
          className="w-40 h-40 rounded-full"
        />
      </div>
      <div className="w-full h-[25%] flex items-center justify-center text-white">
        <h1 className="font-semibold text-2xl">{api.title}</h1>
      </div>
    </div>
  );
};

export default APIsCard;
