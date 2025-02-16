"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:8000/auth/signup", formData);
      setMessage("✅ Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-center pt-28 pb-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 bg-[#22252b] p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-white text-3xl font-semibold text-center">
          Sign Up
        </h2>
        {message && <p className="text-center mt-4 text-white">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-3 text-white bg-[#1a1c1f] border border-gray-600 rounded-md mt-4"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 text-white bg-[#1a1c1f] border border-gray-600 rounded-md mt-4"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 text-white bg-[#1a1c1f] border border-gray-600 rounded-md mt-4"
            required
          />

          <button
            type="submit"
            className="w-full px-4 py-3 mt-6 font-semibold text-white bg-gradient-to-r from-[#00E8FC] to-[#6A00F4] rounded-md transition-transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00E8FC]">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
