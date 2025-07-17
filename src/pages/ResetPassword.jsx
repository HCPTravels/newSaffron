import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth ? useAuth() : { resetPassword: null };
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [showNewPassword, setShowNewPassword] = useState(false); // Initially false (hidden)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Initially false (hidden)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prefer context function if available, else fallback to axios
      let res;
      
      if (resetPassword) {
        console.log("Using context resetPassword function");
        res = await resetPassword({ email, newPassword, confirmPassword });
      } else {
        console.log("Using axios directly");
        const apiUrl = `${backendUrl}/api/new/password`;
        console.log("Making request to:", apiUrl);
        
        const response = await axios.post(apiUrl, { 
          email, 
          newPassword, 
          confirmPassword 
        });
        
        console.log("Response received:", response);
        res = response.data;
      }
      
      console.log("Final response:", res);
      
      if (res && res.success) {
        toast.success("Password reset successful!", {
          description: "You can now log in with your new password.",
          duration: 3000,
          position: "top-center",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        throw new Error(res?.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      
      // Handle different error types
      let errorMessage = "Please try again.";
      
      if (error.response) {
        // Server responded with error status
        console.log("Error response:", error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // Request made but no response
        console.log("No response received:", error.request);
        errorMessage = "Unable to connect to server. Please check your connection.";
      } else {
        // Other error
        errorMessage = error.message || errorMessage;
      }
      
      toast.error("Password reset failed!", {
        description: errorMessage,
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if email is available
  if (!email) {
    return (
      <div className="min-h-[calc(100vh-85px)] flex items-center justify-center p-4 bg-white">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Email Found</h2>
          <p className="text-gray-600">Please go back and enter your email first.</p>
          <button 
            onClick={() => navigate("/forgot-password")}
            className="mt-4 px-4 py-2 bg-[#fe6522] text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  
  const fieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-85px)] flex items-center justify-center p-4 bg-white"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
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
      <motion.div
        variants={cardVariants}
        className="w-full max-w-md bg-white rounded-xl overflow-hidden shadow-2xl border-2 border-black p-8"
      >
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-2"
          variants={fieldVariants}
        >
          Reset Password
        </motion.h2>
        <motion.p className="text-gray-600 text-sm mb-6" variants={fieldVariants}>
          Set a new password for <span className="font-semibold">{email}</span>
        </motion.p>
       
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={fieldVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all h-12 pr-12"
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#fe6522] focus:outline-none"
                onClick={() => setShowNewPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </motion.div>
          <motion.div variants={fieldVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all h-12 pr-12"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#fe6522] focus:outline-none"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm h-12"
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            variants={fieldVariants}
          >
            {isLoading ? <span>Resetting...</span> : <span>Reset Password</span>}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;