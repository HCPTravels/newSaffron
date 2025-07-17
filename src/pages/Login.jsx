import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, CheckCircle, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "sonner";
import Saffron from "../assets/bowlSaffron.png";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import { useAuth } from '../context/AuthContext';
import loaderimage from '../assets/loader1.png';
import Modal from '../components/Modal';

const LoginPage = () => {
  const { logIn, forgotSendOtp, verifyForgotOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await logIn({ email, password });
      
      if (!response || !response.success) {
        throw new Error("Login failed - unsuccessful response");
      }
  
      if (!response.user) {
        throw new Error("No user data received from server");
      }
  
      toast.success("Welcome back!", {
        description: "You have been successfully logged in.",
        duration: 3000,
        position: "top-center",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        style: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          border: "1px solid #065f46",
          color: "white",
        },
      });
  
      // Navigate based on user role
      const userRole = response.user.role;
      console.log("User role:", userRole);
      
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/adminpanel');
        } else {
          navigate('/profile');
        }
      }, 1500);
  
    } catch (error) {
      console.error("Login failed:", error);
      
      // Handle axios errors specifically
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Please check your credentials and try again.";
      
      toast.error("Login failed", {
        description: errorMessage,
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
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
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
      className="min-h-[calc(100vh-85px)] flex items-center justify-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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

        {/* Right side login form */}
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
                  Welcome Back
                </motion.h2>
                <motion.p 
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Sign in to your account
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

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all h-12"
                  required
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6,
                    ease: "easeOut"
                  }}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <motion.label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  Password
                </motion.label>
                <div className="relative">
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all h-12 pr-12"
                    required
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.8,
                      ease: "easeOut"
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#fe6522] focus:outline-none"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {/* Forgot Password Link */}
                <motion.div 
                  className="text-right mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                >
                  <a
                    href="#forgot-password"
                    className="text-xs font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowForgotModal(true);
                    }}
                  >
                    Forgot password?
                  </a>
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm h-12"
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 1.0
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <motion.img
                      src={loaderimage}
                      alt="Loading"
                      className="h-8 w-8"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear"
                      }}
                    />
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Log In</span>
                  </>
                )}
              </motion.button>

              <motion.div 
                className="relative py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
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
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm transition-all h-12"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 1.2
                }}
              >
                <FcGoogle className="h-5 w-5" />
                <span>Sign in with Google</span>
              </motion.button>
            </form>

            <motion.div 
              className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 1.3
              }}
            >
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.4 }}
              >
                Don't have an account?{' '}
                <a
                  href="#signup"
                  className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </a>
              </motion.p>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.4 }}
              >
                Are you a seller?{' '}
                <a
                  href="#seller-login"
                  className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors"
                  onClick={() => navigate('/sellerlogin')}
                >
                  Login as seller
                </a>
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Forgot Password Modal */}
      <Modal
        open={showForgotModal}
        onClose={() => {
          setShowForgotModal(false);
          setForgotEmail("");
          setOtpSent(false);
          setOtp("");
          setForgotLoading(false);
          setVerifying(false);
        }}
        title="Reset your password"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!otpSent) {
              setForgotLoading(true);
              try {
                await forgotSendOtp(forgotEmail);
                setOtpSent(true);
                toast.success("OTP sent to your email.", {
                  duration: 3500,
                  position: "top-center",
                });
              } catch (error) {
                toast.error("Failed to send OTP", {
                  description: error.message || "Please try again later.",
                  duration: 4000,
                  position: "top-right",
                });
              } finally {
                setForgotLoading(false);
              }
            } else {
              setVerifying(true);
              try {
                await verifyForgotOtp({ email: forgotEmail, otp });
                toast.success("OTP verified! You can now reset your password.", {
                  duration: 3500,
                  position: "top-center",
                });
                setShowForgotModal(false);
                setForgotEmail("");
                setOtpSent(false);
                setOtp("");
                navigate('/reset-password', { state: { email: forgotEmail } });
              } catch (error) {
                toast.error("Invalid OTP", {
                  description: error.message || "Please try again.",
                  duration: 4000,
                  position: "top-right",
                });
              } finally {
                setVerifying(false);
              }
            }
          }}
          className="space-y-4"
        >
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all h-12"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={e => setForgotEmail(e.target.value)}
            required
            disabled={otpSent}
          />
          {otpSent && (
            <>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all h-12 tracking-widest text-center"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                maxLength={6}
              />
            </>
          )}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm h-12 flex items-center justify-center gap-2"
            disabled={forgotLoading || verifying}
          >
            {forgotLoading || verifying ? (
              <span>{otpSent ? "Verifying..." : "Sending..."}</span>
            ) : (
              <span>{otpSent ? "Verify Otp" : "Send Otp"}</span>
            )}
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default LoginPage;



































// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { LogIn, CheckCircle } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { toast, Toaster } from "sonner";
// import Saffron from "../assets/bowlSaffron.png";
// import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
// import { useAuth } from '../context/AuthContext';

// const LoginPage = () => {
//   const { logIn } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await logIn({ email, password });
//       toast.success("Welcome back!", {
//         description: "You have been successfully logged in.",
//         duration: 3000,
//         position: "top-center",
//         icon: <CheckCircle className="h-5 w-5 text-green-500" />,
//         style: {
//           background: "linear-gradient(135deg, #10b981, #059669)",
//           border: "1px solid #065f46",
//           color: "white",
//         },
//       });
//       setTimeout(() => {
//         navigate("/profile");
//       }, 1500);
//       console.log("Login successful:", response);
//     } catch (error) {
//       console.error("Login failed:", error);
//       toast.error("Login failed", {
//         description: error.message || "Please check your credentials and try again.",
//         duration: 4000,
//         position: "top-right",
//         style: {
//           background: "linear-gradient(135deg, #ef4444, #dc2626)",
//           border: "1px solid #991b1b",
//           color: "white",
//         },
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     toast.info("Google login coming soon", {
//       description: "This feature will be available soon!",
//       duration: 3000,
//       position: "top-right",
//       style: {
//         background: "linear-gradient(135deg, #fe6522, #e55a1d)",
//         border: "1px solid #c2410c",
//         color: "white",
//       },
//     });
//   };

//   // Container animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.15,
//         delayChildren: 0.2
//       }
//     }
//   };

//   // Card animation variants
//   const cardVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 60,
//       scale: 0.9,
//       rotateX: 10
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       rotateX: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 20,
//         duration: 0.8
//       }
//     }
//   };

//   // Image animation variants
//   const imageVariants = {
//     hidden: { 
//       opacity: 0, 
//       x: -100,
//       scale: 0.8,
//       rotate: -5
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       scale: 1,
//       rotate: 0,
//       transition: {
//         type: "spring",
//         stiffness: 80,
//         damping: 25,
//         duration: 1
//       }
//     }
//   };

//   // Form elements animation variants
//   const formVariants = {
//     hidden: { opacity: 0, x: 30, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 120,
//         damping: 25
//       }
//     }
//   };

//   // Individual form field variants
//   const fieldVariants = {
//     hidden: { opacity: 0, y: 20, scale: 0.98 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 150,
//         damping: 20
//       }
//     }
//   };

//   return (
//     <motion.div 
//       className="min-h-[calc(100vh-85px)] flex items-center justify-center p-4"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <Toaster
//         richColors
//         closeButton
//         toastOptions={{
//           style: {
//             fontFamily: 'system-ui, -apple-system, sans-serif',
//             fontSize: '14px',
//             fontWeight: '500',
//             borderRadius: '12px',
//             padding: '16px',
//             boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
//             backdropFilter: 'blur(8px)',
//           },
//         }}
//       />

//       <motion.div
//         variants={cardVariants}
//         className="flex w-full max-w-4xl bg-white mt-30 rounded-xl overflow-hidden shadow-2xl"
//         style={{
//           transformStyle: 'preserve-3d',
//           perspective: '1000px'
//         }}
//       >
//         {/* Left side image */}
//         <motion.div 
//           variants={imageVariants}
//           className="hidden md:flex w-1/2 items-center 
//     border-t-2 border-b-2 border-l-2 border-black 
//     rounded-tl-xl rounded-bl-xl 
//     justify-center p-4 
//     bg-gradient-to-br from-[#fe6522] to-[#e55a1d]"
//         >
//           <motion.img
//             src={Saffron}
//             alt="Saffron background"
//             className="w-80 h-80 object-contain opacity-90"
//             initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
//             animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 60,
//               damping: 20,
//               delay: 0.5,
//               duration: 1.2
//             }}
//           />
//         </motion.div>

//         {/* Right side login form */}
//         <motion.div 
//           variants={formVariants}
//           className="w-full md:w-1/2 
//     border-2 md:border-l-0 border-black 
//     rounded-xl md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none 
//     shadow-lg bg-white p-6"
//         >
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div 
//               variants={fieldVariants}
//               className="flex justify-between items-center mb-6"
//             >
//               <div>
//                 <motion.h2 
//                   className="text-2xl font-bold text-gray-800"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.6, duration: 0.6 }}
//                 >
//                   Welcome Back
//                 </motion.h2>
//                 <motion.p 
//                   className="text-gray-600 text-sm"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.7, duration: 0.6 }}
//                 >
//                   Sign in to your account
//                 </motion.p>
//               </div>
//               <motion.img
//                 src={SaffronIcon}
//                 alt="Saffron Icon"
//                 className="h-12 w-12"
//                 initial={{ opacity: 0, scale: 0, rotate: -180 }}
//                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 200,
//                   damping: 20,
//                   delay: 0.8
//                 }}
//               />
//             </motion.div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <motion.div variants={fieldVariants}>
//                 <motion.label 
//                   htmlFor="email" 
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.9, duration: 0.4 }}
//                 >
//                   Email Address
//                 </motion.label>
//                 <motion.input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all"
//                   required
//                   initial={{ opacity: 0, y: 15, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 120,
//                     damping: 25,
//                     delay: 1,
//                     duration: 0.6
//                   }}
//                 />
//               </motion.div>

//               <motion.div variants={fieldVariants}>
//                 <motion.label 
//                   htmlFor="password" 
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.1, duration: 0.4 }}
//                 >
//                   Password
//                 </motion.label>
//                 <motion.input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all"
//                   required
//                   initial={{ opacity: 0, y: 15, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 120,
//                     damping: 25,
//                     delay: 1.2,
//                     duration: 0.6
//                   }}
//                 />
//               </motion.div>

//               <motion.button
//                 type="submit"
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm"
//                 whileTap={{ scale: 0.98 }}
//                 disabled={isLoading}
//                 initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 100,
//                   damping: 20,
//                   delay: 1.3,
//                   duration: 0.7
//                 }}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Logging in...</span>
//                   </div>
//                 ) : (
//                   <>
//                     <LogIn className="h-4 w-4" />
//                     <span>Log In</span>
//                   </>
//                 )}
//               </motion.button>

//               <motion.div 
//                 className="relative py-2"
//                 initial={{ opacity: 0, scaleX: 0 }}
//                 animate={{ opacity: 1, scaleX: 1 }}
//                 transition={{ delay: 1.4, duration: 0.6 }}
//               >
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </motion.div>

//               <motion.button
//                 type="button"
//                 onClick={handleGoogleLogin}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm transition-all"
//                 whileTap={{ scale: 0.98 }}
//                 initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 100,
//                   damping: 20,
//                   delay: 1.5,
//                   duration: 0.7
//                 }}
//               >
//                 <FcGoogle className="h-5 w-5" />
//                 <span>Sign in with Google</span>
//               </motion.button>
//             </form>

//             <motion.div 
//               className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-sm"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 80,
//                 damping: 25,
//                 delay: 1.6,
//                 duration: 0.8
//               }}
//             >
//               <motion.p 
//                 className="text-gray-600"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 1.7, duration: 0.5 }}
//               >
//                 Don't have an account?{' '}
//                 <a
//                   href="#signup"
//                   className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors"
//                   onClick={() => navigate('/login')}
//                 >
//                   Sign up
//                 </a>
//               </motion.p>
//               <motion.p 
//                 className="text-gray-600"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 1.8, duration: 0.5 }}
//               >
//                 Are you a seller?{' '}
//                 <a
//                   href="#seller-login"
//                   className="font-medium text-[#fe6522] hover:text-[#e55a1d] transition-colors"
//                   onClick={() => navigate('/sellerlogin')}
//                 >
//                   Login as seller
//                 </a>
//               </motion.p>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default LoginPage;

