import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiCopy, FiHeart, FiThumbsUp, FiThumbsDown } from "react-icons/fi";

const ApiPage = () => {
  const [upvotes, setUpvotes] = useState(12);
  const [downvotes, setDownvotes] = useState(3);
  const [favorited, setFavorited] = useState(false);

  const api = {
    name: "Weather API",
    code: `const axios = require('axios');

exports.getWeather = async (req, res) => {
    try {
        const { city } = req.params;
        const response = await axios.get(\`https://api.weatherapi.com/v1/current.json?key=API_KEY&q=\${city}\`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching weather data", error: error.message });
    }
};`,
    documentation: "This API provides real-time weather data for any city. You can fetch temperature, humidity, and weather conditions using a simple GET request.",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(api.code);
    alert("Code copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([api.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${api.name}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-start overflow-hidden"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-9/12 relative mx-auto md:rounded-2xl mt-28"
      >
        <div className="absolute inset-0 w-full h-full bg-cover bg-center blur-md rounded-2xl">
          <img src={"/HeroBackground.png"} alt="API Background" className="object-cover rounded-2xl w-full h-full" />
        </div>

        <div className="relative w-full min-h-full bg-black bg-opacity-60 md:rounded-2xl p-10 shadow-lg flex flex-col items-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-4xl font-semibold"
          >
            {api.name}
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 mt-2 text-lg"
          >
            Easily fetch real-time weather data with this API.
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm flex items-center"
          >
            ✅ Safe to use
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-9/12 bg-[#22252b] p-6 rounded-xl shadow-lg mt-10 relative"
      >
        <div className="absolute top-4 right-4 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleDownload}
            className="text-gray-400 hover:text-white transition"
          >
            <FiDownload size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition"
          >
            <FiCopy size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setFavorited(!favorited)}
            className={`transition ${favorited ? "text-red-500" : "text-gray-400"}`}
          >
            <FiHeart size={20} />
          </motion.button>
        </div>

        <pre className="bg-[#1a1c1f] text-white text-sm p-4 my-6 rounded-lg overflow-x-auto">
          <code>{api.code}</code>
        </pre>

        <div className="flex items-center gap-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setUpvotes(upvotes + 1)}
            className="flex items-center text-gray-400 hover:text-white transition"
          >
            <FiThumbsUp size={20} className="mr-1" /> {upvotes}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDownvotes(downvotes + 1)}
            className="flex items-center text-gray-400 hover:text-white transition"
          >
            <FiThumbsDown size={20} className="mr-1" /> {downvotes}
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-9/12 p-8 mt-10 bg-[#22252b] rounded-xl shadow-lg"
      >
        <h2 className="text-white text-2xl font-semibold">Documentation</h2>
        <p className="text-gray-400 mt-2">{api.documentation}</p>
      </motion.div>
    </motion.div>
  );
};

export default ApiPage;