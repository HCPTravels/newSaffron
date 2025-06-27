import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import Saffron from "../assets/saffron.png";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: ""
  });

  const [isHovered, setIsHovered] = useState(false);
  const [focusedFields, setFocusedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    contactNumber: false,
    password: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (field) => {
    setFocusedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleBlur = (field) => {
    setFocusedFields(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData)
      .then(response => {
        console.log("Signup successful:", response, user);
      })
      .catch(error => {
        console.error("Signup failed:", error);
      });
    console.log("Signing up with:", formData);
  };

  return (
    <div className="mt-20 flex items-center justify-center p-2 md:top-0 relative overflow-hidden bg-[#ff6523]">
      {/* Background image - matches login page */}
      <div className="hidden sm:flex absolute inset-0 justify-center items-center z-0">
        <img 
          src={Saffron} 
          alt="Saffron background" 
          className="w-full max-w-4xl h-auto object-cover opacity-70"
        />
      </div>

      {/* Modal container - matches login page exactly */}
      <div className="w-full mx-auto px-4 flex justify-center items-center h-full py-4 z-30 md:z-30">
        <motion.div 
          className="w-full max-w-md mx-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* White box - matches login styling */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/95">
            {/* Header - matches login styling */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h2 className="text-white text-xl sm:text-2xl font-bold">Create Account</h2>
                  <p className="text-white/90 text-xs sm:text-sm mt-1">Join our community</p>
                </div>
                <img 
                  src={SaffronIcon}
                  alt="Saffron Icon"
                  className="h-10 w-10 sm:h-16 sm:w-16 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
                />
              </div>
            </div>
            
            {/* Form area */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                      onFocus={() => handleFocus("firstName")}
                      onBlur={() => handleBlur("firstName")}
                      required
                    />
                  </motion.div>
                </div>

                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                      onFocus={() => handleFocus("lastName")}
                      onBlur={() => handleBlur("lastName")}
                      required
                    />
                  </motion.div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    required
                  />
                </motion.div>
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                    onFocus={() => handleFocus("contactNumber")}
                    onBlur={() => handleBlur("contactNumber")}
                    required
                  />
                </motion.div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    required
                  />
                </motion.div>
              </div>
              
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 mt-4"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(254, 101, 34, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <motion.span
                  animate={{ x: isHovered ? 2 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.span>
                <span>Sign Up</span>
              </motion.button>
            </form>
            
            {/* Footer - matches login styling */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50/80 text-center border-t border-gray-200/50">
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{' '}
                <a href="#login" className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors" onClick={() => navigate('/login')}>
                  Log in
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;