import React from "react";

const APIsCard = ({ api }) => {
  console.log(api);
  return (
    <div className=" w-52 h-72 bg-yellow-200 rounded-lg">
      <div className="w-full h-[80%] flex items-center justify-center">
        <img
          src={api.image}
          alt={api.title}
          className="w-40 h-40 rounded-full"
        />
      </div>
      <div className="w-full h-[20%] flex items-center justify-center">
        <h1 className="font-semibold text-xl">{api.title}</h1>
      </div>
    </div>
  );
};

export default APIsCard;
