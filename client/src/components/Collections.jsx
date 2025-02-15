import React, { useRef } from "react";

import APIsCard from "./APIsCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Collections = ({ collectionName, apis }) => {
  const collectionRef = useRef(null);
  useGSAP(() => {
    if (!collectionRef.current) return;

    gsap.from(collectionRef.current.children, {
      scrollTrigger: {
        trigger: collectionRef.current,
        start: "top 80%",
      },
      duration: 0.5,
      y: 400,
      stagger: 0.3,
    });
  }, []);
  return (
    <section className="w-full min-h-[500px] relative  bg-[#121315ed] p-10 ">
      <h1 className="text-white text-4xl font-bold border-b-4 inline-block border-blue-500 mb-5 max-sm:text-2xl">
        {collectionName}
      </h1>
      <div className="w-full h-[350px] rounded-2xl p-5 flex items-center overflow-x-auto overflow-y-hidden bg-[#222528]">
        <div ref={collectionRef} className="flex gap-x-5">
          {apis.map((api) => (
            <APIsCard key={api.id} api={api} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
