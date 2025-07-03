import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { toast, Toaster } from "sonner";
import Saffron from "../assets/saffron.png";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import { useAuth } from '../context/AuthContext';

const OtpVerificationPage = () => {
  const { verifyOtp, resendOtp } = useAuth();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    try {
      await verifyOtp({ email, otp });
      
      toast.success("Verification Successful!", {
        description: "You have been successfully logged in.",
        duration: 3000,
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });

      setTimeout(() => {
        navigate("/signupform", { state: { email } });
      }, 1500);
    } catch (error) {
      toast.error("Verification Failed", {
        description: error.message || "Invalid OTP. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await resendOtp(email);
      toast.success("OTP Resent", {
        description: "A new OTP has been sent to your email.",
        duration: 3000,
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
    } catch (error) {
      toast.error("Failed to resend OTP", {
        description: error.message || "Please try again later.",
        duration: 4000,
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="mt-20 flex items-center justify-center p-2 md:top-0 relative overflow-hidden bg-[#ff6523]">
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
                  <button 
                    onClick={handleGoBack}
                    className="flex items-center text-white/90 hover:text-white mb-2 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span className="text-xs">Back</span>
                  </button>
                  <h2 className="text-white text-xl sm:text-2xl font-bold">Verify Your Email</h2>
                  <p className="text-white/90 text-xs sm:text-sm mt-1">
                    Enter the 6-digit code sent to {email}
                  </p>
                </div>
                <img 
                  src={SaffronIcon}
                  alt="Saffron Icon"
                  className="h-10 w-10 sm:h-16 sm:w-16 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
                />
              </div>
            </div>
            
            <form onSubmit={handleVerify} className="p-4 sm:p-6 space-y-6">
              <div className="space-y-4">
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
                        const value = e.target.value.replace(/\D/g, '');
                        setOtp(value.slice(0, 6));
                      }}
                      placeholder="Enter 6-digit code"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200 bg-white/90 text-center text-lg tracking-widest font-medium"
                      required
                      maxLength={6}
                      pattern="\d{6}"
                      inputMode="numeric"
                    />
                  </motion.div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Didn't receive the code?{' '}
                    <button 
                      type="button" 
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="text-[#fe6522] hover:text-[#e55a1d] font-medium disabled:opacity-50"
                    >
                      {isResending ? "Sending..." : "Resend OTP"}
                    </button>
                  </p>
                </div>
              </div>
              
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(254, 101, 34, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Verify & Continue</span>
                  </>
                )}
              </motion.button>
            </form>
            
            <div className="px-4 sm:px-6 py-4 bg-gray-50/80 text-center border-t border-gray-200/50">
              <p className="text-xs sm:text-sm text-gray-600">
                Having trouble? Contact{' '}
                <a href="mailto:support@example.com" className="font-medium text-[#fe6522] hover:text-[#e55a1d]">
                  support
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;