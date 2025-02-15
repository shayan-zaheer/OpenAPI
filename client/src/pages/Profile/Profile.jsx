import React from "react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const user = {
    displayName: "John Doe",
    email: "johndoe@example.com",
    profilePhoto: "/profile-pic.png",
    createdAt: "2024-02-01T12:00:00Z",
  };

  const apis = [
    {
      _id: "1",
      name: "Weather API",
      documentation: "Provides real-time weather data with temperature and humidity.",
      visibility: "public",
      cost: 0,
    },
    {
      _id: "2",
      name: "Crypto Price API",
      documentation: "Fetches live cryptocurrency prices in USD.",
      visibility: "private",
      cost: 10,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-start overflow-hidden">
      {/* Profile Section (Styled like Hero Section) */}
      <div className="w-9/12 relative mx-auto md:rounded-2xl mt-24">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 w-full h-full bg-cover bg-center blur-md rounded-2xl">
          <img
            src={"/HeroBackground.png"}
            alt="Profile Background"
            className="object-cover rounded-2xl w-full h-full"
          />
        </div>

        {/* Dark Overlay */}
        <div className="relative w-full min-h-full bg-black bg-opacity-60 md:rounded-2xl p-10 shadow-lg flex flex-col items-center">
          {/* Profile Picture */}
          <img
            src={user.profilePhoto || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-[#6A00F4] shadow-md"
          />

          {/* User Name */}
          <h2 className="text-white text-3xl font-semibold mt-4">{user.displayName}</h2>

          {/* User Email */}
          <p className="text-gray-400 text-md">{user.email}</p>

          {/* Extra Info */}
          <div className="mt-6 text-center">
            <p className="text-white text-sm">
              <span className="text-gray-400">Joined: </span> {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="text-white text-sm mt-2">
              <span className="text-gray-400">Total APIs: </span> {apis.length}
            </p>
          </div>
        </div>
      </div>

      {/* API Section */}
      <div className="w-9/12 p-8 mt-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-white text-4xl font-semibold text-center"
        >
          Your Uploaded{" "}
          <span className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text">
            APIs
          </span>
        </motion.h1>

        {/* API List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {apis.length > 0 ? (
            apis.map((api) => (
              <motion.div
                key={api._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-[#22252b] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
              >
                {/* API Name */}
                <h2 className="text-white text-xl font-semibold">{api.name}</h2>

                {/* API Description */}
                <p className="text-gray-400 mt-2 text-sm">{api.documentation.slice(0, 100)}...</p>

                {/* API Visibility & Cost */}
                <div className="flex justify-between items-center mt-4">
                  <span className={`text-sm font-semibold ${api.visibility === "public" ? "text-green-400" : "text-red-400"}`}>
                    {api.visibility.toUpperCase()}
                  </span>
                  <span className="text-white text-sm">${api.cost}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 mt-4 text-center">You haven't uploaded any APIs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
