import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import axios from "axios";

const ProfilePage = () => {
    const { id } = useParams();
    const loggedInUser = useSelector((state) => state.user.user);

    const [user, setUser] = useState(null);
    const [apis, setApis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/user/${id}`
                );
                setUser(data?.user);
            } catch (error) {
                setMessage("Error fetching profile.");
            } finally {
                setLoading(false);
            }
        };

        const fetchAPIs = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/api/user/${id}`
                );
                console.log(data);
                setApis(data?.APIs || []);
            } catch (error) {
                setMessage("Error fetching APIs.");
            }
        };

        fetchProfile();
        fetchAPIs();
    }, [id, loggedInUser]);

    if (loading) {
        return (
            <p className="text-white text-center mt-10">Loading profile...</p>
        );
    }

    if (!user) {
        return <p className="text-white text-center mt-10">User not found.</p>;
    }

    return (
        <div className="w-full min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-start overflow-hidden">
            <div className="w-9/12 relative mx-auto md:rounded-2xl mt-24">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center blur-md rounded-2xl">
                    <img
                        src={"/HeroBackground.png"}
                        alt="Profile Background"
                        className="object-cover rounded-2xl w-full h-full"
                    />
                </div>

                <div className="relative w-full min-h-full bg-black bg-opacity-60 md:rounded-2xl p-10 shadow-lg flex flex-col items-center">
                    <img
                        src={user?.profilePhoto || "/default-avatar.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-[#6A00F4] shadow-md"
                    />

                    <h2 className="text-white text-3xl font-semibold mt-4">
                        {user?.username}
                    </h2>

                    <p className="text-gray-400 text-md">{user?.email}</p>

                    <div className="mt-6 text-center">
                        <p className="text-white text-sm">
                            <span className="text-gray-400">Joined: </span>{" "}
                            {new Date(user?.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-white text-sm mt-2">
                            <span className="text-gray-400">Total APIs: </span>{" "}
                            {apis.length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-9/12 p-8 mt-10">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-white text-4xl font-semibold text-center"
                >
                    {loggedInUser?._id === user?._id
                        ? "Your Uploaded "
                        : `${user.username}'s Uploaded `}
                    <span className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text">
                        APIs
                    </span>
                </motion.h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {apis.length > 0 ? (
                        apis.map((api) => (
                            <Link to={`http://localhost:5173/api/${api._id}`}>
                                <motion.div
                                    key={api._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.03 }}
                                    className="relative bg-[#22252b] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                                >
                                   {loggedInUser?._id === user?._id && <button
                                        to={`/api/update/${api._id}`}
                                        className="z-40 absolute top-3 right-3 text-gray-400 hover:text-white transition"
                                    >
                                        <FiEdit size={20} />
                                    </button>}

                                    <h2 className="text-white text-xl font-semibold">
                                        {api.name}
                                    </h2>
                                    <p className="text-gray-400 mt-2 text-sm">
                                        {api.documentation.slice(0, 100)}...
                                    </p>

                                    <div className="flex justify-between items-center mt-4">
                                        <span
                                            className={`text-sm font-semibold ${
                                                api.visibility === "public"
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            }`}
                                        >
                                            {api.visibility.toUpperCase()}
                                        </span>
                                        <span className="text-white text-sm">
                                            ${api.cost}
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-400 mt-4 text-center">
                            {loggedInUser?._id === user?._id
                                ? "You haven't uploaded any APIs yet."
                                : "This user has not uploaded any APIs yet."}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
