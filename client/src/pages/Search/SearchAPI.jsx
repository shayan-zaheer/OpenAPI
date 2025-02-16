import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter } from "react-icons/fi";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const BrowseApis = () => {
  const [apis, setApis] = useState([]);
  const { language } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  console.log(language);
  useEffect(() => {
    if (language) {
      const getAPIsByLanguage = async () => {
        try {
          const result = await axios.get(
            `http://localhost:8000/api/language/${language}`
          );
          if (result?.data?.apis.status === 404) {
            return setApis([]);
          }

          setApis(result?.data?.apis);
        } catch (err) {
          setApis([]);
        }
      };
      getAPIsByLanguage();
    } else {
      const getAllAPIs = async () => {
        try {
          const result = await axios.get("http://localhost:8000/api");
          setApis(result?.data?.apis);
          console.log(result?.data?.apis);
        } catch (err) {
          setApis([]);
        }
      };
      getAllAPIs();
    }
  }, []);

  const filteredApis = apis.filter(
    (api) =>
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLanguage === "all" || api.language === selectedLanguage)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-start overflow-hidden py-16"
    >
      {/* Header Section */}
      <div className="w-9/12 relative mx-auto md:rounded-2xl mt-16">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center blur-md rounded-2xl">
          <img
            src={"/HeroBackground.png"}
            alt="API Background"
            className="object-cover rounded-2xl w-full h-full"
          />
        </div>

        <div className="relative w-full min-h-full bg-black bg-opacity-60 md:rounded-2xl p-10 shadow-lg flex flex-col items-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-4xl font-semibold"
          >
            Explore{" "}
            <span className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-gradient text-transparent bg-clip-text">
              APIs
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 mt-2 text-lg text-center"
          >
            Search, filter, and find the best free APIs for your projects.
          </motion.p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="w-9/12 flex flex-col md:flex-row items-center gap-4 mt-8">
        {/* Search Bar */}
        <div className="w-full md:w-2/3 relative">
          <FiSearch className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search APIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#22252b] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Language Filter */}
        {!language && (
          <div className="w-full md:w-1/3 relative">
            <FiFilter
              className="absolute left-4 top-3 text-gray-400"
              size={20}
            />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#22252b] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Languages</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
        )}
      </div>

      {/* API Cards Section */}
      <div className="w-9/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredApis.length > 0 ? (
          filteredApis.map((api) => (
            <Link to={`http://localhost:5173/api/${api?._id}`}>
              <motion.div
                key={api.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-[#22252b] p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition lg:w-80 lg:h-36 flex-wrap"
              >
                <h2 className="text-white text-xl font-semibold">{api.name}</h2>
                <p className="text-gray-400 mt-2 text-sm">{api.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      api.language === "javascript"
                        ? "bg-yellow-500 text-black"
                        : api.language === "python"
                        ? "bg-blue-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {api.language.toUpperCase()}
                  </span>
                  <button className="px-4 py-2 text-white bg-[#6A00F4] rounded-md hover:bg-[#5000C9] transition">
                    View API
                  </button>
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 mt-6 text-center col-span-full">
            No APIs found.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default BrowseApis;
