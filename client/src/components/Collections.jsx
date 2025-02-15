"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import APIsCard from "./APIsCard";
gsap.registerPlugin(ScrollTrigger);

const Collections = ({ collectionName, apis }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !cardsRef.current) return;

    // Get widths dynamically once
    const containerWidth = containerRef.current.offsetWidth;
    const scrollWidth = cardsRef.current.scrollWidth + 130;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top 10%",
        end: `+=${scrollWidth - containerWidth}`,
        scrub: 1,
      },
    });

    tl.to(cardsRef.current, {
      x: `-${scrollWidth - containerWidth}px`,
      ease: "none",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[500px] bg-[#1a1c1ff8] relative top-20 p-10"
    >
      <h1 className="text-white text-4xl font-bold border-b-4 inline-block border-blue-500 mb-5 max-sm:text-2xl">
        {collectionName} Collection
      </h1>
      <div className="w-full h-[425px] rounded-2xl p-5 flex items-center overflow-x-hidden bg-[#222528]">
        <div ref={cardsRef} className="flex gap-x-5">
          {apis.map((api) => (
            <APIsCard key={api.id} info={api} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
