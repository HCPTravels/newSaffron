import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "sonner"; // Modern toast library
import Saffron from "../assets/saffron.png";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import { useAuth } from '../context/AuthContext'; // adjust path


const LoginPage = () => {
  const { logIn , user} = useAuth(); // Use the login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await logIn({ email, password }); // ✅ pass as object
      console.log("Login successful:", response, user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  
    console.log("Logging in with:", { email, password });
  };
  const handleGoogleLogin = () => {
    toast.info("Google login coming soon", {
      description: "This feature will be available soon!",
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <div className="mt-20 flex items-center justify-center p-2 md:top-0 relative overflow-hidden bg-[#ff6523]">
      {/* Toast notifications */}
      <Toaster richColors closeButton />
      
      {/* Background image with overlay - only show on larger screens */}
      <div className="hidden sm:flex absolute inset-0 justify-center items-center z-0">
        <img 
          src={Saffron} 
          alt="Saffron background" 
          className="w-full max-w-4xl h-auto object-cover opacity-70"
        />
      </div>

      {/* Login modal */}
      <div className="w-full mx-auto px-4 flex justify-center items-center h-full py-4 z-30 md:z-30">
        <motion.div 
          className="w-full max-w-md mx-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/95">
            {/* Orange header */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h2 className="text-white text-xl sm:text-2xl font-bold">Welcome Back</h2>
                  <p className="text-white/90 text-xs sm:text-sm mt-1">Sign in to your account</p>
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
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200 bg-white/90 text-sm sm:text-base"
                      required
                    />
                  </motion.div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200 bg-white/90 text-sm sm:text-base"
                      required
                    />
                  </motion.div>
                </div>
              </div>
              
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
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
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <>
                    <motion.span
                      animate={{ x: isHovered ? 2 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.span>
                    <span>Log In</span>
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google Sign-In Button */}
              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FcGoogle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Sign in with Google</span>
              </motion.button>
            </form>
            
            {/* Footer */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50/80 text-center border-t border-gray-200/50">
              <p className="text-xs sm:text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#signup" className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;