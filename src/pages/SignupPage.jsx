import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, CheckCircle, Mail, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Saffron from "../assets/newsaffron.png";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const { logIn, sendOtp, emailOtp ,verifyOtp} = useAuth();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
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
        general: ""
      }));
      toast.success("OTP sent successfully!", {
        description: "Check your email for the verification code.",
        duration: 3000,
        position: "top-center",
        icon: <Mail className="h-5 w-5 text-green-500" />,
        style: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          border: "1px solid #065f46",
          color: "white",
        },
      });
    } catch (error) {
      console.error("OTP sending failed:", error);
      
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
      
      toast.error("Failed to send OTP", {
        description: error.message || "Please try again later.",
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
      const response = await verifyOtp({ email, otp });
      toast.success("Account created successfully!", {
        description: "Welcome to our platform!",
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
        navigate("/signupform", { state: { email } });
      }, 1500);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        otp: error.message || "Invalid OTP. Please try again."
      }));
      
      toast.error("Verification failed", {
        description: error.message || "Please check your OTP and try again.",
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

  const handleGoogleLogin = () => {
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

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Image animation variants
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Form elements animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Individual form field variants
  const fieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="h-screen flex items-center justify-center p-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      <motion.div
        variants={cardVariants}
        className="flex w-full max-w-4xl bg-white mt-30 rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Left side image */}
        <motion.div 
          variants={imageVariants}
          className="hidden md:flex w-1/2 items-center 
    border-t-2 border-b-2 border-l-2 border-black 
    rounded-tl-xl rounded-bl-xl 
    justify-center p-4 
    bg-gradient-to-br from-[#fe6522] to-[#e55a1d]"
        >
          <motion.img
            src={Saffron}
            alt="Saffron background"
            className="w-80 h-80 object-contain opacity-90"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2
            }}
          />
        </motion.div>

        {/* Right side signup form */}
        <motion.div 
          variants={formVariants}
          className="w-full md:w-1/2 
    border-2 md:border-l-0 border-black 
    rounded-xl md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none 
    shadow-lg bg-white p-6"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={fieldVariants}
              className="flex justify-between items-center mb-6"
            >
              <div>
                <motion.h2 
                  className="text-2xl font-bold text-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {otpSent ? "Verify Your Email" : "Create Account"}
                </motion.h2>
                <motion.p 
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {otpSent ? "Enter your OTP code" : "Sign up with your email"}
                </motion.p>
              </div>
              <motion.img
                src={SaffronIcon}
                alt="Saffron Icon"
                className="h-12 w-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.4
                }}
              />
            </motion.div>

            {/* General Error Message */}
            {errors.general && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4"
              >
                <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{errors.general}</span>
              </motion.div>
            )}

            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
              <motion.div variants={fieldVariants}>
                <motion.label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  Email Address
                </motion.label>
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6,
                    ease: "easeOut"
                  }}
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
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.email 
                        ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-[#fe6522]/50 focus:border-transparent'
                    } focus:outline-none focus:ring-2 transition-all`}
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
              </motion.div>

              {otpSent && (
                <motion.div 
                  variants={fieldVariants}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <motion.label 
                    htmlFor="otp" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    OTP Code
                  </motion.label>
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.8,
                      ease: "easeOut"
                    }}
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
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.otp 
                          ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-[#fe6522]/50 focus:border-transparent'
                      } focus:outline-none focus:ring-2 transition-all`}
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
                  <motion.p 
                    className="text-xs text-gray-500 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                  >
                    Check your email for the OTP. Didn't receive it?{' '}
                    <button 
                      type="button" 
                      onClick={handleSendOtp}
                      className="text-[#fe6522] hover:text-[#e55a1d] font-medium"
                    >
                      Resend
                    </button>
                  </motion.p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm"
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: otpSent ? 1.0 : 0.9
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{otpSent ? "Verifying..." : "Sending..."}</span>
                  </div>
                ) : (
                  <>
                    {otpSent ? <CheckCircle className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                    <span>{otpSent ? "Verify OTP" : "Send OTP"}</span>
                  </>
                )}
              </motion.button>

              {!otpSent && (
                <>
                  <motion.div 
                    className="relative py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.4 }}
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm transition-all"
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 1.1
                    }}
                  >
                    <FcGoogle className="h-5 w-5" />
                    <span>Sign up with Google</span>
                  </motion.button>
                </>
              )}
            </form>

            <motion.div 
              className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 1.2
              }}
            >
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
              >
                Already have an account?{' '}
                <a
                  href="#login"
                  className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </a>
              </motion.p>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.4 }}
              >
                Want to sell on our platform?{' '}
                <a
                  href="#seller-signup"
                  className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors"
                  onClick={() => navigate('/sellersignup')}
                >
                  Sign up as seller
                </a>
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;