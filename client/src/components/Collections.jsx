import React from "react";

import APIsCard from "./APIsCard";

const Collections = ({ collectionName, apis }) => {
  return (
    <section className="w-full min-h-[500px] relative  bg-[#121315ed] p-10 ">
      <h1 className="text-white text-4xl font-bold border-b-4 inline-block border-blue-500 mb-5 max-sm:text-2xl">
        {collectionName}
      </h1>
      <div className="w-full h-[350px] rounded-2xl p-5 flex items-center overflow-x-auto bg-[#222528]">
        <div className="flex gap-x-5">
          {apis.map((api) => (
            <APIsCard key={api.id} api={api} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
