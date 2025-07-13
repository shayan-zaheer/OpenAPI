import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react";

const PrivacyPolicy = () => {
    return (
        <div className="w-full min-h-screen bg-[#1a1c1ff8] flex flex-col items-center justify-start overflow-hidden py-8 px-4">
            <div className="w-full max-w-5xl relative mx-auto md:rounded-2xl mt-16">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center blur-md rounded-2xl">
                    <img
                        src={"/HeroBackground.png"}
                        alt="Privacy Background"
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
                        Privacy{" "}
                        <span className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text">
                            Policy
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-gray-400 mt-2 text-base md:text-lg text-center"
                    >
                        Your privacy is important to us. Learn how we protect your data.
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
                className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6"
            >
                <div className="bg-[#22252b] p-3 md:p-4 rounded-lg text-center">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#00E8FC] mx-auto mb-2" />
                    <h3 className="text-white font-semibold text-sm md:text-base">Secure</h3>
                    <p className="text-gray-400 text-xs md:text-sm">Data Protection</p>
                </div>
                <div className="bg-[#22252b] p-3 md:p-4 rounded-lg text-center">
                    <Eye className="w-6 h-6 md:w-8 md:h-8 text-[#D400A5] mx-auto mb-2" />
                    <h3 className="text-white font-semibold text-sm md:text-base">Transparent</h3>
                    <p className="text-gray-400 text-xs md:text-sm">Clear Practices</p>
                </div>
                <div className="bg-[#22252b] p-3 md:p-4 rounded-lg text-center">
                    <Lock className="w-6 h-6 md:w-8 md:h-8 text-[#6A00F4] mx-auto mb-2" />
                    <h3 className="text-white font-semibold text-sm md:text-base">Private</h3>
                    <p className="text-gray-400 text-xs md:text-sm">Your Control</p>
                </div>
                <div className="bg-[#22252b] p-3 md:p-4 rounded-lg text-center">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-[#FF0044] mx-auto mb-2" />
                    <h3 className="text-white font-semibold text-sm md:text-base">User-Focused</h3>
                    <p className="text-gray-400 text-xs md:text-sm">Your Rights</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-full max-w-5xl bg-[#22252b] rounded-lg shadow-lg p-6 md:p-8 mt-6 mb-10"
            >
                <div className="text-white space-y-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#00E8FC]">1. Information We Collect</h2>
                        <p className="text-gray-300 leading-relaxed mb-3 text-sm md:text-base">
                            We collect information to provide better services to our users. The types of information we collect include:
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ml-2 md:ml-4">
                            <div>
                                <h4 className="font-semibold text-blue-400 mb-2 text-sm md:text-base">Personal Information</h4>
                                <ul className="list-disc list-inside text-gray-300 space-y-1 text-xs md:text-sm">
                                    <li>Name and email address</li>
                                    <li>Profile information</li>
                                    <li>Account preferences</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-blue-400 mb-2 text-sm md:text-base">Usage Information</h4>
                                <ul className="list-disc list-inside text-gray-300 space-y-1 text-xs md:text-sm">
                                    <li>API usage statistics</li>
                                    <li>Platform interactions</li>
                                    <li>Performance metrics</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#00E8FC]">2. How We Use Your Information</h2>
                        <p className="text-gray-300 leading-relaxed mb-3 text-sm md:text-base">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2 md:ml-4 text-xs md:text-sm">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send technical notices and support messages</li>
                            <li>Respond to comments, questions, and customer service requests</li>
                            <li>Monitor and analyze trends, usage, and activities</li>
                            <li>Detect, investigate, and prevent fraudulent activities</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">3. Information Sharing</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>With your explicit consent</li>
                            <li>To comply with legal obligations</li>
                            <li>To protect our rights and safety</li>
                            <li>With trusted service providers who assist our operations</li>
                            <li>In connection with a merger, acquisition, or sale of assets</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">4. Data Security</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We implement appropriate security measures to protect your personal information:
                        </p>
                        <div className="bg-[#1a1c1f] p-4 rounded-lg ml-4">
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Regular security audits and assessments</li>
                                <li>Access controls and authentication</li>
                                <li>Secure hosting infrastructure</li>
                                <li>Employee training on data protection</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">5. Your Rights and Choices</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            You have several rights regarding your personal information:
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ml-2 md:ml-4">
                            <div className="bg-[#1a1c1f] p-3 md:p-4 rounded-lg">
                                <h4 className="font-semibold text-purple-400 mb-2 text-sm md:text-base">Access & Portability</h4>
                                <p className="text-gray-300 text-xs md:text-sm">Request access to your data and receive it in a portable format.</p>
                            </div>
                            <div className="bg-[#1a1c1f] p-3 md:p-4 rounded-lg">
                                <h4 className="font-semibold text-purple-400 mb-2 text-sm md:text-base">Correction & Updates</h4>
                                <p className="text-gray-300 text-xs md:text-sm">Update or correct your personal information at any time.</p>
                            </div>
                            <div className="bg-[#1a1c1f] p-3 md:p-4 rounded-lg">
                                <h4 className="font-semibold text-purple-400 mb-2 text-sm md:text-base">Deletion</h4>
                                <p className="text-gray-300 text-xs md:text-sm">Request deletion of your personal information (subject to legal requirements).</p>
                            </div>
                            <div className="bg-[#1a1c1f] p-3 md:p-4 rounded-lg">
                                <h4 className="font-semibold text-purple-400 mb-2 text-sm md:text-base">Opt-out</h4>
                                <p className="text-gray-300 text-xs md:text-sm">Unsubscribe from marketing communications and data processing.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">6. Cookies and Tracking</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We use cookies and similar tracking technologies to improve your experience. These help us remember your preferences, understand how you use our platform, and provide personalized content. You can control cookie settings through your browser preferences.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">7. Third-Party Services</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Our platform may integrate with third-party services (such as Google OAuth for authentication). These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of third-party services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">8. Children&apos;s Privacy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us so we can take appropriate action.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">9. International Transfers</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#00E8FC]">10. Changes to This Policy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our platform and updating the effective date. We encourage you to review this policy periodically.
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

export default PrivacyPolicy;