import React from "react";
import Hero from "./Hero";
import Collections from "../../components/Collections";
import FIrstSection from "./FIrstSection";

const Home = () => {
  const apis = [
    {
      id: 1,
      title: "Python",
      image: "/python.png",
      link: "/apis/python",
    },
    {
      id: 2,
      title: "JavaScript",
      image: "/javascript.png",
      link: "/apis/javascript",
    },
    {
      id: 3,
      title: "Java",
      image: "/java.png",
      link: "/apis/java",
    },
  ];
  return (
    <div className="w-full mt-20 min-h-screen bg-[#1a1c1ff8]">
      <FIrstSection />
      <Collections collectionName={"APIs Languages"} apis={apis} />
    </div>
  );
};

export default Home;
