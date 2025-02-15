import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full max-sm:h-[535px] bg-[#222528] pt-4 border border-black ">
      <div className="w-full h-11/12 flex max-sm:flex-col sm:flex-col md:flex-row justify-center lg:mb-5">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center space-x-2">
            <img
              src={"/Logo.png"}
              alt="Logo"
              style={{ width: "auto", height: "auto" }}
              width={50}
              height={50}
            />
            <h1 className="text-white text-xl font-bold pt-2">
              <Link to={"/"}>OPEN API</Link>
            </h1>
          </div>
          <h1 className="text-slate-200 text-lg font-semibold text-center w-9/12 max-sm:w-[370px] mt-3 max-sm:text-[16px]">
            OPEN API is a community-driven platform for discovering, sharing,
            and managing both free and paid APIs. It helps developers find
            reliable APIs while offering a space for API creators to showcase
            their work.
          </h1>
        </div>
        <div
          className="flex justify-around w-full max-sm:mt-8 sm:mt-8 text-white sm:justify-start sm:mx-24 max-sm:justify-start max-sm:mx-24
        "
        >
          <div>
            <h1 className="font-semibold text-2xl border-b-4 border-blue-500 max-sm:text-xl">
              Explore
            </h1>
            <ul className="mt-2 text-lg max-sm:text-sm italic space-y-1">
              <li className="footer-links">
                <Link to={"/apis"}>
                  <span className="footer-links-span">All APIs</span>
                </Link>
              </li>
              <li className="footer-links">
                <Link to={"/upload"}>
                  <span className="footer-links-span">Upload API</span>
                </Link>
              </li>
              <li className="footer-links">
                <Link to={"/"}>
                  <span className="footer-links-span">My Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-10/12 h-2 border-t-2 border-slate-400 mx-auto mt-2 max-sm:mt-8"></div>
      <div className="w-full sm:h-[40px] max-sm:h-[30px] flex items-center justify-center">
        <h1 className="text-white text-lg font-semibold">
          © 2025 OPEN API. All rights reserved.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
