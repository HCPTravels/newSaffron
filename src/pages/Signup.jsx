import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { toast } from "sonner"; // Modern toast library
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import Saffron3 from "../assets/saffron3.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: ""
  });
 
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Show loading toast
    const toastId = toast.loading("Creating your account...", {
      description: "Please wait while we set up your account"
    });
    
    try {
      const response = await signUp(formData);
      console.log("Full signup response:", response); // Debug log
      
      // Check if response contains the success message or token
      if (response.message === "User created" || response.token) {
        // Success toast with user details
        toast.success(`Welcome, ${response.user.firstName}!`, {
          description: `Account created successfully for ${response.user.email}`,
          duration: 5000,
          position: "top-center",
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
          password: ""
        });
        navigate('/'); // Redirect to login page after signup
        // Optional: Redirect after successful signup
        // navigate('/dashboard'); 
      } else {
        // This handles cases where the response doesn't match expected success format
        toast.error("Registration completed but with unexpected response", {
          description: "Please contact support if you experience issues",
          duration: 4000,
          position: "top-right"
        });
      }
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Registration failed", {
        description: error.response?.data?.message || 
                   "We couldn't create your account. Please try again later.",
        duration: 4000,
        position: "top-right"
      });
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="mt-20 md:mt-30 flex items-center justify-center bg-[#ff6523] p-4 md:overflow-x-hidden relative">
      {/* Background image with overlay - adjusted for mobile */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 flex flex-col md:flex-row gap-2 md:gap-8 justify-center items-center opacity-70">
          <img 
            src={Saffron3} 
            className="sm:block -rotate-20 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64" 
            alt="Saffron decoration"
          />
          <img 
            src={Saffron3} 
            className="sm:block rotate-20 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64" 
            alt="Saffron decoration"
          />
        </div>
      </div>

      <motion.div 
        className="w-full max-w-md mx-auto px-2 sm:px-4 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* White modal container */}
        <div className="bg-white border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          {/* Orange header */}
          <div className="p-4 sm:p-6 bg-[#ff6523]">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl sm:text-2xl font-bold">Create Account</h2>
              <img
                src={SaffronIcon}   
                className="h-10 w-10 sm:h-14 sm:w-14"        
                alt="Saffron icon"
              />
            </div>
          </div>
          
          {/* White form area */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 bg-white z-50">
            {/* First and Last Name in one row */}
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
                    required
                  />
                </motion.div>
              </div>
            </div>

            {/* Email */}
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
                  required
                />
              </motion.div>
            </div>

            {/* Contact Number */}
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
                  required
                />
              </motion.div>
            </div>

            {/* Password */}
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
                  required
                />
              </motion.div>
            </div>
            
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 mt-4 relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(254, 101, 34, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <motion.span
                    animate={{ x: isHovered ? 2 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.span>
                  <span>Sign Up</span>
                </>
              )}
            </motion.button>
          </form>
          
          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 text-center border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">
              Already have an account?{' '}
              <a href="#login" className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors">
                Log in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;