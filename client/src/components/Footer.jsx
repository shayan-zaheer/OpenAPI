import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-[#222528] border-t border-gray-600">
            {/* Main Footer Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <div className="flex items-center space-x-3">
                            <img
                                src={"/Logo.png"}
                                alt="Logo"
                                className="w-12 h-12 rounded-full"
                            />
                            <h1 className="text-white text-2xl font-bold">
                                <Link to={"/"} className="hover:text-blue-400 transition-colors">
                                    OPEN{" "}
                                    <span className="bg-gradient-to-r from-[#FF0044] to-[#00D4FF] text-transparent bg-clip-text">
                                        API
                                    </span>
                                </Link>
                            </h1>
                        </div>
                        <p className="text-gray-300 text-center md:text-left text-sm max-w-sm leading-relaxed">
                            A community-driven platform for discovering and sharing APIs. 
                            Connect developers with reliable API solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-white font-semibold text-lg mb-4 border-b-2 border-blue-500 pb-1">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-center md:text-left">
                            <li>
                                <Link 
                                    to={"/allApis"} 
                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                                >
                                    Browse APIs
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to={"/upload"} 
                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                                >
                                    Upload API
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to={"/"} 
                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                                >
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-white font-semibold text-lg mb-4 border-b-2 border-purple-500 pb-1">
                            Legal
                        </h3>
                        <ul className="space-y-2 text-center md:text-left">
                            <li>
                                <Link 
                                    to={"/terms"} 
                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to={"/privacy"} 
                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-600 bg-[#1a1c1f]">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © 2025 OPEN API. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link 
                                to={"/terms"} 
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Terms
                            </Link>
                            <Link 
                                to={"/privacy"} 
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
