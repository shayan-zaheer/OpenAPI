"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateAPI = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [apiData, setApiData] = useState({
    name: "",
    language: "javascript",
    documentation: "",
    code: "",
    owner: user?._id || "",
    visibility: "public",
    cost: 0,
    allowedUsers: [],
  });

  const [allUsers, setAllUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch API details & users
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/${id}`);
        setApiData({
          ...data.api,
          allowedUsers: Array.isArray(data.api.allowedUsers) ? data.api.allowedUsers : [],
        });
      } catch (error) {
        setMessage("Error fetching API details.");
      }
    };

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/user");
        setAllUsers(data?.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAPI();
    fetchUsers();
  }, [id]);

  const handleChange = (e) => {
    setApiData({ ...apiData, [e.target.name]: e.target.value });
  };

  const toggleUserSelection = (userId) => {
    setApiData((prevData) => ({
      ...prevData,
      allowedUsers: Array.isArray(prevData.allowedUsers)
        ? prevData.allowedUsers.includes(userId)
          ? prevData.allowedUsers.filter((id) => id !== userId) // Remove if selected
          : [...prevData.allowedUsers, userId] // Add if not selected
        : [userId], // Ensure it's an array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.put(`http://localhost:8000/api/update/${id}`, apiData);
      setMessage("✅ API updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error updating API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-start py-10">
      <div className="w-9/12 relative mx-auto md:rounded-2xl mt-20 min-h-96">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center blur-md rounded-2xl">
          <img src={"/HeroBackground.png"} alt="Update API Background" className="object-cover rounded-2xl w-full h-full" />
        </div>

        <div className="relative w-full min-h-full bg-black bg-opacity-60 md:rounded-2xl p-10 shadow-lg">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col w-full">
            <h1 className="text-white text-5xl md:text-6xl font-semibold text-center">
              Update Your{" "}
              <span className="bg-gradient-to-r from-[#FF0044] to-[#00D4FF] text-transparent bg-clip-text animate-gradient">
                API
              </span>
            </h1>
            <p className="text-slate-300 text-center md:text-lg font-semibold mt-4">
              Modify your API details and update effortlessly.
            </p>

            {message && <p className="text-center mt-4 text-white">{message}</p>}

            <form onSubmit={handleSubmit} className="w-full mt-6 bg-[#22252b] p-8 rounded-lg shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="name" value={apiData.name} onChange={handleChange} placeholder="API Name" className="w-full px-4 py-3 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none" required />

                <select name="language" value={apiData.language} onChange={handleChange} className="w-full px-4 py-3 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none" required>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <textarea name="documentation" value={apiData.documentation} onChange={handleChange} placeholder="API Documentation" className="w-full px-4 py-3 mt-4 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none" rows="4" required />

              <textarea name="code" value={apiData.code} onChange={handleChange} placeholder="Controller Code" className="w-full px-4 py-3 mt-4 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none" rows="6" required />

              <select name="visibility" value={apiData.visibility} onChange={handleChange} className="w-full px-4 py-3 mt-4 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none" required>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              <input type="number" name="cost" value={apiData.cost} onChange={handleChange} placeholder="Cost ($0 for free)" className="w-full px-4 py-3 mt-4 text-white bg-[#1a1c1f] border border-gray-600 rounded-md focus:outline-none" />

              {/* Allowed Users Multi-Select Dropdown */}
              <label className="text-white mt-4 block">Allowed Users:</label>
              <div className="relative">
                <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full px-4 py-3 text-white bg-[#1a1c1f] border border-gray-600 rounded-md flex justify-between items-center">
                  {apiData?.allowedUsers?.length > 0 ? `${apiData?.allowedUsers?.length} Users Selected` : "Select Users"}
                </button>

                {dropdownOpen && (
                  <div className="z-40 absolute w-full bg-[#1a1c1f] border border-gray-600 mt-2 max-h-40 overflow-auto rounded-md shadow-lg">
                    {allUsers.map((user) => (
                      <label key={user._id} className="flex items-center gap-2 px-4 py-2 hover:bg-[#22252b] cursor-pointer">
                        <input type="checkbox" checked={apiData.allowedUsers.includes(user._id)} onChange={() => toggleUserSelection(user._id)} />
                        <span className="text-white">{user.displayName} ({user.email})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="relative px-6 py-3 mt-6 font-semibold text-white bg-transparent border border-white hover:border-transparent rounded-md transition-transform duration-300 hover:scale-105" disabled={loading}>
                {loading ? "Updating..." : "Update API"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAPI;
