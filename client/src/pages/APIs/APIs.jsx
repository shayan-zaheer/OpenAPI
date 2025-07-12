import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FiDownload, FiCopy } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ApiPage = () => {
    const { id } = useParams();
    const [api, setApi] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const getAPI = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/${id}`,
                    { withCredentials: true }
                );
                setApi(data?.api);

                if (
                    data.api.cost === 0 ||
                    data.api.authorizedUsers.includes(user?._id) ||
                    data.api.owner._id === user?._id
                ) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch (err) {
                setApi({
                    failure:
                        err?.response?.data?.message || "This is a private API",
                });
            }
        };

        getAPI();
    }, [id, user]);

    if (api?.failure) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full min-h-screen flex items-center justify-center text-center"
            >
                <h1 className="text-white text-4xl font-semibold">
                    {api.failure}
                </h1>
            </motion.div>
        );
    }

    const handleCopy = () => {
        if (authorized && api?.code) {
            navigator.clipboard.writeText(api.code);
            alert("Code copied to clipboard!");
        }
    };

    const handleDownload = () => {
        if (authorized && api?.code) {
            const blob = new Blob([api.code], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${api.name}.js`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-start overflow-hidden">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-9/12 relative mx-auto md:rounded-2xl mt-28"
            >
                <div className="relative w-full min-h-full bg-black bg-opacity-60 md:rounded-2xl p-10 shadow-lg flex flex-col items-center">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white text-4xl font-semibold"
                    >
                        {api?.name || "API Not Found"}
                    </motion.h1>

                    {api?.cost > 0 ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm flex items-center"
                        >
                            🔒 Paid API - ${api?.cost}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm flex items-center"
                        >
                            ✅ Free API
                        </motion.div>
                    )}

                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 10, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white text-lg font-semibold"
                    >
                        Owned by:{" "}
                        <Link
                            to={`/profile/${api?.owner?._id}`}
                            className="text-blue-400"
                        >
                            {api?.owner?.username}
                        </Link>
                    </motion.p>
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
                        disabled={!authorized}
                    >
                        <FiDownload size={20} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-white transition"
                        disabled={!authorized}
                    >
                        <FiCopy size={20} />
                    </motion.button>
                </div>

                <pre
                    className={`bg-[#1a1c1f] text-white text-sm p-4 my-6 rounded-lg overflow-x-auto ${
                        !authorized ? "blur-md select-none" : ""
                    }`}
                >
                    <code>
                        {authorized
                            ? api?.code
                            : "// You need access to view this code"}
                    </code>
                </pre>
            </motion.div>

            <div className="w-9/12 p-8 mt-10 bg-[#22252b] rounded-xl shadow-lg">
                <h2 className="text-white text-2xl font-semibold">
                    Documentation
                </h2>
                <p className="text-gray-400 mt-2">
                    {api?.documentation || "No documentation available."}
                </p>
            </div>
        </div>
    );
};

export default ApiPage;
