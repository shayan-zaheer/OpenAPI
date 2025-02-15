import { ArrowLeft, Menu, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className="w-full h-20 bg-[#1A1C1F] flex justify-between items-center px-4 fixed top-0 z-50 shadow-lg">
      {/* Left Logo with Project Name Start */}
      <div className="flex items-center space-x-2">
        <img src={"/Logo.png"} alt="Logos" className="w-16 h-16 rounded-full" />
        <h1 className="text-white text-xl font-bold pt-2">
          <Link to={"/"}>OPEN API</Link>
        </h1>
      </div>
      {/* Left Logo with Project Name Start */}
      {/* Right Side of Navbar Start */}
      <div className=" hidden md:flex  ">
        <ul className="flex items-center text-white font-semibold text-lg gap-x-2 ">
          <li className="h-16 px-4 flex items-center">
            <Link
              to={"/apis"}
              className="transition duration-300 ease hover:scale-105"
            >
              {" "}
              APIs
            </Link>
          </li>
          <li className="h-16 px-4  flex items-center">
            <Link
              to={"/profile"}
              className="transition duration-300 ease hover:scale-105"
            >
              {" "}
              Profile
            </Link>
          </li>
          <li>
            <button className="navbar-button">Login</button>
          </li>
        </ul>
      </div>
      {/* Right Side of Navbar End */}

      {/* Responsive Right side of navbar start */}
      <div className="flex items-center space-x-4 md:hidden">
        <div>
          {!openMenu ? (
            <Menu
              className="text-white w-7 h-7 cursor-pointer"
              onClick={() => setOpenMenu(true)}
            />
          ) : (
            <X
              className="text-white w-7 h-7 cursor-pointer"
              onClick={() => setOpenMenu(false)}
            />
          )}
        </div>
      </div>
      {/* Responsive Right side of navbar end */}

      {/* Responsive Menu Starts */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className=" responsive-menu"
            initial={{ x: "200%" }}
            animate={{ x: 0 }}
            exit={{ x: "200%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <ul className="w-full h-full flex flex-col justify-center text-white font-semibold">
              <li
                className="h-16 border-b px-4 flex items-center"
                onClick={() => setOpenMenu(false)}
              >
                <Link to={"/apis"} className="responsive-menu-links">
                  {" "}
                  APIs
                </Link>
              </li>
              <li
                className="h-16 border-b px-4  flex items-center"
                onClick={() => setOpenMenu(false)}
              >
                <Link to={"/profile/"} className="responsive-menu-links">
                  {" "}
                  Profile
                </Link>
              </li>
              <li className="h-16 px-4  flex items-center justify-center">
                <button className="navbar-button">Login</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Responsive Menu Ends */}
    </nav>
  );
};

export default Navbar;
