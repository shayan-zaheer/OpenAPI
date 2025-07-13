import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsAndConditions = () => {
    return (
        <div className="w-full min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-start overflow-hidden py-8 px-4">
            <div className="w-full max-w-5xl relative mx-auto md:rounded-2xl mt-16">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center blur-md rounded-2xl">
                    <img
                        src={"/HeroBackground.png"}
                        alt="Legal Background"
                        className="object-cover rounded-2xl w-full h-full"
                    />
                </div>

                <div className="relative w-full min-h-full bg-black bg-opacity-60 md:rounded-2xl p-6 md:p-10 shadow-lg flex flex-col items-center">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white text-2xl md:text-4xl font-semibold text-center"
                    >
                        Terms and{" "}
                        <span className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text">
                            Conditions
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-gray-400 mt-2 text-base md:text-lg text-center"
                    >
                        Please read these terms carefully before using our platform.
                    </motion.p>
                </div>
            </div>

            <div className="w-full max-w-5xl mt-6">
                <Link 
                    to="/" 
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm md:text-base"
                >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Back to Home
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full max-w-5xl bg-[#22252b] rounded-lg shadow-lg p-6 md:p-8 mt-6 mb-10"
            >
                <div className="text-white space-y-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#00E8FC]">1. Acceptance of Terms</h2>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                            By accessing and using the OPEN API platform, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service apply to all users of the platform, including but not limited to API providers and consumers.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#00E8FC]">2. Use License</h2>
                        <p className="text-gray-300 leading-relaxed mb-3 text-sm md:text-base">
                            Permission is granted to temporarily access and use OPEN API for personal and commercial purposes. This license grants you:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2 md:ml-4 text-xs md:text-sm">
                            <li>Access to browse and discover APIs</li>
                            <li>Ability to upload and share your own APIs</li>
                            <li>Use of our platform features for legitimate purposes</li>
                            <li>Integration of available APIs in your projects</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">3. User Accounts</h2>
                        <p className="text-gray-300 leading-relaxed">
                            To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">4. API Submissions</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            When you upload an API to our platform, you represent and warrant that:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>You own or have the right to distribute the API</li>
                            <li>The API does not violate any third-party rights</li>
                            <li>The API documentation is accurate and complete</li>
                            <li>You will maintain and support your API as described</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">5. Prohibited Uses</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            You may not use our platform to:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Upload malicious or harmful content</li>
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe upon intellectual property rights</li>
                            <li>Distribute spam or unwanted communications</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">6. Content Moderation</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We reserve the right to review, modify, or remove any content that violates these terms or our community guidelines. We may suspend or terminate accounts that repeatedly violate our policies.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">7. Disclaimer</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The information on this platform is provided on an &ldquo;as is&rdquo; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">8. Limitations</h2>
                        <p className="text-gray-300 leading-relaxed">
                            In no event shall OPEN API or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the platform, even if OPEN API or an authorized representative has been notified of the possibility of such damage.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">9. Revisions</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We may revise these terms of service at any time without notice. By using this platform, you are agreeing to be bound by the current version of these terms of service. We will notify users of significant changes through our platform or via email.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-gray-600">
                        <p className="text-gray-400 text-sm">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TermsAndConditions;