import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const { setUser: setUserAction } = userActions;
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/status`,
                    {
                        withCredentials: true,
                    }
                );
                dispatch(setUserAction(data.user));
            } catch (err) {
                console.error("Auth status check failed:", err);
                dispatch(setUserAction(null));
            }
        };
        checkAuthStatus();
    }, [dispatch, setUserAction]);

    const [openMenu, setOpenMenu] = useState(false);

    const handleGoogle = (e) => {
        e.preventDefault();
        window.location.href = `${
            import.meta.env.VITE_BACKEND_URL
        }/auth/google`;
    };

    const logout = async (e) => {
        e.preventDefault();
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
                withCredentials: true,
            });
            dispatch(setUserAction(null));
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="w-full h-20 bg-[#1A1C1F] flex justify-between items-center px-4 fixed top-0 z-50 shadow-lg">
            <div className="flex items-center space-x-2">
                <img
                    src={"/Logo.png"}
                    alt="Logo"
                    className="w-16 h-16 rounded-full"
                />
                <h1 className="text-white text-xl font-bold pt-2">
                    <Link to={"/"}>
                        OPEN{" "}
                        <span className="animate-gradient bg-gradient-to-r from-[#FF0044] to-[#00D4FF]  animate-gradient text-transparent bg-clip-text">
                            API
                        </span>
                    </Link>
                </h1>
            </div>

            <div className="hidden md:flex items-center space-x-4">
                {!user ? (
                    <ul className="flex items-center text-white font-semibold text-lg gap-x-4">
                        <li>
                            <Link
                                to={"/allApis"}
                                className="transition duration-300 ease hover:scale-105"
                            >
                                APIs
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul className="flex items-center text-white font-semibold text-lg gap-x-4">
                        <li>
                            <Link
                                to={"/allApis"}
                                className="transition duration-300 ease hover:scale-105"
                            >
                                APIs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/upload"}
                                className="transition duration-300 ease hover:scale-105"
                            >
                                Upload
                            </Link>
                        </li>
                    </ul>
                )}

                {user ? (
                    <>
                        <div className="flex items-center space-x-3">
                            <Link to={`/profile/${user._id}`}>
                                {!user.profilePhoto ? (
                                    <div className="w-10 h-10 rounded-full border-white border-2 text-white flex items-center justify-center bg-gradient-to-r from-[#FF0044] to-[#00D4FF]">
                                        {user?.username?.[0]?.toUpperCase() ||
                                            "U"}
                                    </div>
                                ) : (
                                    <img
                                        src={
                                            user.profilePhoto || "/default.png"
                                        }
                                        alt="User"
                                        className="w-10 h-10 rounded-full border-2 border-white"
                                    />
                                )}
                            </Link>
                            <span className="text-white font-semibold">
                                {user?.username || "User"}
                            </span>
                        </div>
                        <button
                            onClick={logout}
                            className="navbar-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="navbar-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            onClick={handleGoogle}
                            className="navbar-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Sign in with Google
                        </button>
                    </>
                )}
            </div>

            <div className="flex items-center md:hidden">
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

            <AnimatePresence>
                {openMenu && (
                    <motion.div
                        className="responsive-menu"
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
                                <Link
                                    to={"/allApis"}
                                    className="responsive-menu-links"
                                >
                                    APIs
                                </Link>
                            </li>
                            
                            {/* Legal Links */}
                            <li
                                className="h-16 border-b px-4 flex items-center"
                                onClick={() => setOpenMenu(false)}
                            >
                                <Link
                                    to={"/terms"}
                                    className="responsive-menu-links"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li
                                className="h-16 border-b px-4 flex items-center"
                                onClick={() => setOpenMenu(false)}
                            >
                                <Link
                                    to={"/privacy"}
                                    className="responsive-menu-links"
                                >
                                    Privacy Policy
                                </Link>
                            </li>

                            {user ? (
                                <>
                                    <li
                                        className="h-16 border-b px-4 flex items-center"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        <Link
                                            to={"/upload"}
                                            className="responsive-menu-links"
                                        >
                                            Upload
                                        </Link>
                                    </li>
                                    <li className="h-16 px-4 flex items-center justify-center">
                                        <div className="flex items-center space-x-3">
                                            <Link to={`/profile/${user._id}`}>
                                                {!user.profilePhoto ? (
                                                    <div className="w-10 h-10 rounded-full border-white border-2 text-white flex items-center justify-center bg-gradient-to-r from-[#FF0044] to-[#00D4FF]">
                                                        {user?.username?.[0]?.toUpperCase() ||
                                                            "U"}
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={
                                                            user.profilePhoto ||
                                                            "/default.png"
                                                        }
                                                        alt="User"
                                                        className="w-10 h-10 rounded-full border-2 border-white"
                                                    />
                                                )}
                                            </Link>
                                            <span className="text-white font-semibold">
                                                {user?.username || "User"}
                                            </span>
                                        </div>
                                    </li>
                                    <li className="h-16 px-4 flex items-center justify-center">
                                        <button
                                            onClick={logout}
                                            className="navbar-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="h-16 px-4 flex items-center justify-center">
                                        <button
                                            className="navbar-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                            onClick={() => {
                                                setOpenMenu(false);
                                                navigate("/login");
                                            }}
                                        >
                                            Login
                                        </button>
                                    </li>
                                    <li className="h-16 px-4 flex items-center justify-center">
                                        <button
                                            onClick={handleGoogle}
                                            className="navbar-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Sign in with Google
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
