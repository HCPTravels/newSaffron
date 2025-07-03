import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, CheckCircle, Mail, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Saffron from "../assets/saffron.png";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { logIn, sendOtp , emailOtp} = useAuth();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    general: ""
  });
  const navigate = useNavigate();

  const clearErrors = () => {
    setErrors({
      email: "",
      otp: "",
      general: ""
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearErrors();
    
    if (!email) {
      setErrors(prev => ({
        ...prev,
        email: "Please enter your email address"
      }));
      setIsLoading(false);
      return;
    }
  
    try {
      await emailOtp(email);
      setOtpSent(true);
      setErrors(prev => ({
        ...prev,
        general: "" // Clear any previous errors
      }));
      navigate('/otpverify', { state: { email } });  
    
    } catch (error) {
      console.error("OTP sending failed:", error);
      
      // Handle specific error cases with user-friendly messages
      if (error.message.includes("Account already exists")) {
        setErrors(prev => ({
          ...prev,
          email: "This email is already registered. Please use the login page instead."
        }));
      } else if (error.message.includes("Please log in")) {
        setErrors(prev => ({
          ...prev,
          email: "Your account exists. Please log in to continue."
        }));
      } else if (error.message.includes("Cannot connect to server")) {
        setErrors(prev => ({
          ...prev,
          general: "Unable to reach the server. Please check your connection."
        }));
      } else if (error.message.includes("Server error")) {
        setErrors(prev => ({
          ...prev,
          general: "Something went wrong on our end. Please try again in a few minutes."
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: error.message || "Failed to send OTP. Please try again later."
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearErrors();

    if (!otp) {
      setErrors(prev => ({
        ...prev,
        otp: "Please enter the OTP code"
      }));
      setIsLoading(false);
      return;
    }

    try {
      const response = await logIn({ email, otp });
      
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        otp: error.message || "Invalid OTP. Please try again."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setErrors(prev => ({
      ...prev,
      general: "Google login feature will be available soon!"
    }));
  };

  return (
    <div className="mt-20 flex items-center justify-center p-2 md:top-0 relative overflow-hidden bg-[#ff6523]">
      <div className="hidden sm:flex absolute inset-0 justify-center items-center z-0">
        <img 
          src={Saffron} 
          alt="Saffron background" 
          className="w-full max-w-4xl h-auto object-cover opacity-70"
        />
      </div>

      <div className="w-full mx-auto px-4 flex justify-center items-center h-full py-4 z-30 md:z-30">
        <motion.div 
          className="w-full max-w-md mx-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/95">
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h2 className="text-white text-xl sm:text-2xl font-bold">Welcome Back</h2>
                  <p className="text-white/90 text-xs sm:text-sm mt-1">
                    {otpSent ? "Enter your OTP" : "Sign in with your email"}
                  </p>
                </div>
                <img 
                  src={SaffronIcon}
                  alt="Saffron Icon"
                  className="h-10 w-10 sm:h-16 sm:w-16 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
                />
              </div>
            </div>
            
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="p-4 sm:p-6 space-y-4">
              {/* General Error Message */}
              {errors.general && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-700">{errors.general}</span>
                </motion.div>
              )}

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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors(prev => ({ ...prev, email: "" }));
                        }
                      }}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg border ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-[#fe6522]/50 focus:border-transparent'
                      } focus:outline-none focus:ring-2 transition-all duration-200 bg-white/90 text-sm sm:text-base`}
                      required
                      disabled={otpSent}
                    />
                    {errors.email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                  </motion.div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 flex items-center gap-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {otpSent && (
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                      OTP Code
                    </label>
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value);
                          if (errors.otp) {
                            setErrors(prev => ({ ...prev, otp: "" }));
                          }
                        }}
                        placeholder="Enter 6-digit OTP"
                        className={`w-full px-4 py-2 sm:py-3 rounded-lg border ${
                          errors.otp 
                            ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-[#fe6522]/50 focus:border-transparent'
                        } focus:outline-none focus:ring-2 transition-all duration-200 bg-white/90 text-sm sm:text-base`}
                        required
                        maxLength={6}
                        pattern="\d{6}"
                      />
                      {errors.otp && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </motion.div>
                    {errors.otp && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center gap-1"
                      >
                        {errors.otp}
                      </motion.p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Check your email for the OTP. Didn't receive it?{' '}
                      <button 
                        type="button" 
                        onClick={handleSendOtp}
                        className="text-[#fe6522] hover:text-[#e55a1d] font-medium"
                      >
                        Resend
                      </button>
                    </p>
                  </div>
                )}
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
                    <span>{otpSent ? "Verifying..." : "Sending..."}</span>
                  </div>
                ) : (
                  <>
                    <motion.span
                      animate={{ x: isHovered ? 2 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {otpSent ? <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" /> : <Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </motion.span>
                    <span>{otpSent ? "Verify OTP" : "Send OTP"}</span>
                  </>
                )}
              </motion.button>

              {!otpSent && (
                <>
                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

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
                </>
              )}
            </form>
            
            <div className="px-4 sm:px-6 py-4 bg-gray-50/80 text-center border-t border-gray-200/50">
              <p className="text-xs sm:text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors" 
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;