import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const UploadAPI = () => {
  const user = useSelector((state) => state.user.user);
  const [apiData, setApiData] = useState({
    name: "",
    language: "javascript",
    documentation: "",
    code: "",
    owner: user?._id || "",
    visibility: "public",
    cost: 0,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setApiData({ ...apiData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/", apiData);
      setMessage("API uploaded successfully!");
      toast.success("API uploaded successfully!");
      setApiData({
        name: "",
        language: "javascript",
        documentation: "",
        code: "",
        owner: user?._id || "",
        visibility: "public",
        cost: 0,
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error uploading API.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setApiData({
      name: "",
      language: "javascript",
      documentation: "",
      code: "",
      owner: user?._id || "",
      visibility: "public",
      cost: 0,
    });
    setMessage("");
    toast.success("Form reset!");
  };

  return (
    <div className="w-full relative min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-start py-10">
      <div className="w-9/12 relative mx-auto md:rounded-2xl mt-20 min-h-96">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center blur-md rounded-2xl">
          <img
            src={"/HeroBackground.png"}
            alt="Upload API Background"
            className="object-cover rounded-2xl w-full h-full"
          />
        </div>

        <div className="relative w-full min-h-full bg-black bg-opacity-60 md:rounded-2xl p-10 shadow-lg">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col w-full"
          >
            <h1 className="text-white text-5xl md:text-6xl font-semibold text-center">
              Upload Your{" "}
              <span className="bg-gradient-to-r from-[#FF0044] to-[#00D4FF] text-transparent bg-clip-text animate-gradient">
                API
              </span>
            </h1>
            <p className="text-slate-300 text-center md:text-lg font-semibold mt-4">
              Share your API with the world! Provide details and upload your API
              effortlessly.
            </p>

            {message && (
              <p className="text-center mt-4 text-white">{message}</p>
            )}

            <form
              onSubmit={handleSubmit}
              onReset={handleReset}
              className="w-full mt-6 bg-[#22252b] p-8 rounded-lg shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={apiData.name}
                  onChange={handleChange}
                  placeholder="API Name"
                  className="w-full px-4 py-3 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none"
                  required
                />

                <select
                  name="language"
                  value={apiData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none"
                  required
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <textarea
                name="documentation"
                value={apiData.documentation}
                onChange={handleChange}
                placeholder="API Documentation"
                className="w-full px-4 py-3 mt-4 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none"
                rows="4"
                required
              />

              <textarea
                name="code"
                value={apiData.code}
                onChange={handleChange}
                placeholder="Controller Code"
                className="w-full px-4 py-3 mt-4 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none"
                rows="6"
                required
              />

              <select
                name="visibility"
                value={apiData.visibility}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-4 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none"
                required
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              <input
                type="number"
                name="cost"
                value={apiData.cost}
                onChange={handleChange}
                placeholder="Cost ($0 for free)"
                className="w-full px-4 py-3 mt-4 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none"
              />

              <div className="flex justify-start gap-x-10 max-sm:gap-x-5 mt-6">
                <button
                  type="submit"
                  className="relative px-6 py-3 font-semibold text-white bg-transparent border border-white hover:border-transparent overflow-hidden group rounded-md transition-transform duration-300 hover:scale-105"
                  disabled={loading}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                  <span className="relative z-10 text-white">
                    {loading ? "Uploading..." : "Submit API"}
                  </span>
                </button>
                <button
                  type="reset"
                  className="relative px-6 py-3 font-semibold text-white bg-transparent border border-white hover:border-transparent overflow-hidden group rounded-md transition-transform duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800 transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                  <span className="relative z-10 text-white">Reset</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UploadAPI;
