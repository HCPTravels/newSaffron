import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, CheckCircle, Loader2 } from "lucide-react";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import Saffron from "../assets/saffron.png";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
  
    try {
      const response = await signUp(formData);
      
      // Show success toast
      toast.success("Account created!", {
        description: "Your account has been successfully created.",
        duration: 3000,
        position: "top-center",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        style: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          border: "1px solid #065f46",
          color: "white",
        },
      });

      // Navigate after a short delay to show the toast
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
      
      console.log("Signup successful:", response, user);
    } catch (error) {
      console.error("Signup failed:", error);
      
      // Show error toast
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

  return (
    <div className="mt-20 flex items-center justify-center p-2 md:top-0 relative overflow-hidden bg-[#ff6523]">
      {/* Toast notifications */}
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

      {/* Background image */}
      <div className="hidden sm:flex absolute inset-0 justify-center items-center z-0">
        <img 
          src={Saffron} 
          alt="Saffron background" 
          className="w-full max-w-4xl h-auto object-cover opacity-70"
        />
      </div>

      {/* Modal container */}
      <div className="w-full mx-auto px-4 flex justify-center items-center h-full py-4 z-30 md:z-30">
        <motion.div 
          className="w-full max-w-md mx-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* White box */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/95">
            {/* Header */}
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
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 mt-4"
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
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating account...</span>
                  </div>
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