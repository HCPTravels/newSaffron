import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, CheckCircle, Loader2, Store, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import Saffron from "../assets/saffron.png";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useLocation } from "react-router-dom";

const SignupPage = () => {
  const location = useLocation();
  const passedEmail = location.state?.email || "";
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: passedEmail,
    contactNumber: "",
    password: "",
    accountType: "user", // 'user' or 'seller'
    businessName: "", // Only for sellers
    businessType: "" // Only for sellers
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      accountType: type,
      businessName: type === 'seller' ? prev.businessName : "",
      businessType: type === 'seller' ? prev.businessType : ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await signUp(formData);
      
      toast.success("Account created!", {
        description: `Your ${formData.accountType} account has been successfully created.`,
        duration: 3000,
        position: "top-center",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        style: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          border: "1px solid #065f46",
          color: "white",
        },
      });

      setTimeout(() => {
        navigate(formData.accountType === 'seller' ? "/seller-dashboard" : "/profile");
      }, 1500);
      
      console.log("Signup successful:", response, user);
    } catch (error) {
      console.error("Signup failed:", error);
      
      toast.error("Signup failed", {
        description: error.message || "Please check your information and try again.",
        duration: 4000,
        position: "top-right",
        style: {
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          border: "1px solid #991b1b",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info("Google signup coming soon", {
      description: "This feature will be available soon!",
      duration: 3000,
      position: "top-right",
      style: {
        background: "linear-gradient(135deg, #fe6522, #e55a1d)",
        border: "1px solid #c2410c",
        color: "white",
      },
    });
  };

  return (
    <div className="mt-20 flex items-center justify-center p-4 md:top-0 relative overflow-hidden bg-[#ff6523] min-h-screen">
      <Toaster 
        richColors 
        closeButton 
        toastOptions={{
          style: {
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(8px)',
          },
        }}
      />

      <div className="hidden sm:flex absolute inset-0 justify-center items-center z-0">
        <img 
          src={Saffron} 
          alt="Saffron background" 
          className="w-full max-w-4xl h-auto object-cover opacity-70"
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 flex justify-center items-center h-full py-4 z-30">
        <motion.div 
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/95">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h2 className="text-white text-2xl lg:text-3xl font-bold">Create Account</h2>
                  <motion.p 
                    className="text-white/90 text-sm mt-1"
                    key={formData.accountType}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Join as {formData.accountType === 'seller' ? 'seller' : 'user'}
                  </motion.p>
                </div>
                <img 
                  src={SaffronIcon}
                  alt="Saffron Icon"
                  className="h-16 w-16 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 items-start">
                {/* Left Side - Input Fields */}
                <div className="lg:col-span-3 space-y-4 lg:space-y-6">
                  {/* Account Type Selector */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Type</h3>
                    <div className="relative flex rounded-xl bg-gray-100 p-1 shadow-inner">
                      {/* Animated sliding background */}
                      <motion.div
                        className="absolute top-1 bottom-1 bg-white rounded-lg shadow-md"
                        initial={false}
                        animate={{
                          left: formData.accountType === 'user' ? '4px' : '50%',
                          right: formData.accountType === 'user' ? '50%' : '4px',
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                          duration: 0.3
                        }}
                      />
                      
                      <motion.button
                        type="button"
                        className={`relative z-10 flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-all duration-300 ${
                          formData.accountType === 'user' 
                            ? 'text-[#fe6522]' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => handleAccountTypeChange('user')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          animate={{
                            scale: formData.accountType === 'user' ? 1.1 : 1,
                            rotate: formData.accountType === 'user' ? [0, -5, 5, 0] : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <User className="h-5 w-5" />
                        </motion.div>
                        <span>User</span>
                      </motion.button>
                      
                      <motion.button
                        type="button"
                        className={`relative z-10 flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-all duration-300 ${
                          formData.accountType === 'seller' 
                            ? 'text-[#fe6522]' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => handleAccountTypeChange('seller')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          animate={{
                            scale: formData.accountType === 'seller' ? 1.1 : 1,
                            rotate: formData.accountType === 'seller' ? [0, -5, 5, 0] : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Store className="h-5 w-5" />
                        </motion.div>
                        <span>Seller</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <motion.input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter first name"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <motion.input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter last name"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <motion.input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Number
                        </label>
                        <motion.input
                          type="tel"
                          id="contactNumber"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <motion.input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create password (min 8 characters)"
                          minLength="8"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Information Container - Dynamic Height */}
                  <AnimatePresence mode="wait">
                    {formData.accountType === 'seller' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ 
                          opacity: 1, 
                          height: "auto", 
                          scale: 1,
                          transition: {
                            height: { duration: 0.4, ease: "easeOut" },
                            opacity: { duration: 0.3, delay: 0.1 },
                            scale: { duration: 0.3, delay: 0.1 }
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          height: 0, 
                          scale: 0.95,
                          transition: {
                            height: { duration: 0.3, ease: "easeIn" },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 }
                          }
                        }}
                        className="overflow-hidden"
                      >
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Business Information</h3>
                          <div className="space-y-4">
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            >
                              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                                Business Name
                              </label>
                              <motion.input
                                type="text"
                                id="businessName"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                placeholder="Enter your business name"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                                required={formData.accountType === 'seller'}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                            >
                              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                                Business Type
                              </label>
                              <motion.div 
                                className="relative"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                              >
                                <select
                                  id="businessType"
                                  name="businessType"
                                  value={formData.businessType}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200 appearance-none"
                                  required={formData.accountType === 'seller'}
                                >
                                  <option value="">Select business type</option>
                                  <option value="individual">Individual Seller</option>
                                  <option value="retailer">Retail Business</option>
                                  <option value="wholesaler">Wholesaler</option>
                                  <option value="producer">Producer/Farmer</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <motion.svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ rotate: formData.businessType ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </motion.svg>
                                </div>
                              </motion.div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>

                {/* Right Side - Actions - Fixed Position */}
                <div className="lg:col-span-2 lg:sticky lg:top-44">
                  <div className="bg-gray-50 rounded-xl p-4 lg:p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Complete Registration</h3>
                    
                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm hover:shadow-lg transition-all duration-300 mb-3 lg:mb-4"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 25px rgba(254, 101, 34, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        <>
                          <motion.span
                            animate={{ 
                              x: isHovered ? 2 : 0,
                              rotate: formData.accountType === 'seller' && isHovered ? [0, -5, 5, 0] : 0
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {formData.accountType === 'seller' ? (
                              <Store className="h-5 w-5" />
                            ) : (
                              <UserPlus className="h-5 w-5" />
                            )}
                          </motion.span>
                          <span>Sign Up as {formData.accountType === 'seller' ? 'Seller' : 'User'}</span>
                        </>
                      )}
                    </motion.button>

                    {/* Divider - Reduced spacing on mobile */}
                    <div className="relative py-2 lg:py-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-gray-50 text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    {/* Google Sign-Up Button - Same style as signup button on mobile */}
                    <motion.button
                      type="button"
                      onClick={handleGoogleSignup}
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm hover:shadow-lg transition-all duration-300 lg:bg-white lg:text-gray-700 lg:border lg:border-gray-300 lg:from-transparent lg:to-transparent"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 25px rgba(254, 101, 34, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FcGoogle className="h-5 w-5" />
                      <span>Sign up with Google</span>
                    </motion.button>

                    {/* Login Link - Reduced spacing on mobile */}
                    <div className="text-center mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button 
                          type="button"
                          className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors" 
                          onClick={() => navigate('/login')}
                        >
                          Log in
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;