import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Subtract from "../assets/Subtract.png";
import { User, Menu, LogIn, UserPlus, ChevronDown, BookOpen, Users, Handshake, Contact } from "lucide-react";
import Account from "../modal/Account";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Debug: Log user state and loading
  console.log("Navbar - Current user:", user);
  console.log("Navbar - Is loading:", isLoading);
  
  // Use user directly from context (remove the fallback for now)
  const isLoggedIn = user;
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const userDropdownRef = useRef(null);
  const navDropdownRef = useRef(null);
  const accountModalRef = useRef(null);

  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  const toggleNavDropdown = () => setIsNavDropdownOpen(!isNavDropdownOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsUserDropdownOpen(false);
  };

  // Handle clicks outside dropdowns and modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target)) {
        setIsNavDropdownOpen(false);
      }
      if (accountModalRef.current && !accountModalRef.current.contains(event.target)) {
        setShowAccountModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2, ease: "easeOut" }
    })
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-51 h-[60px] sm:h-[70px] md:h-[80px] lg:h-[100px] bg-[#fe6522] flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={Subtract}
              alt="Logo"
              className="h-[50px] w-[60px] sm:h-[60px] sm:w-[72px] md:h-[65px] md:w-[80px] lg:h-[72px] lg:w-[87px]"
            />
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 z-50">

            {/* User Area */}
            <div
              ref={accountModalRef}
              className="relative group"
              onMouseEnter={() => {
                if (window.innerWidth >= 768 && isLoggedIn) {
                  setShowAccountModal(true);
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth >= 768 && isLoggedIn) {
                  setShowAccountModal(false);
                }
              }}
            >
              {isLoggedIn ? (
                <>
                  {/* Logged-in User Icon */}
                  <motion.div
                    onClick={() => {
                      // On mobile (below 768px), toggle on click
                      if (window.innerWidth < 768) {
                        setShowAccountModal((prev) => !prev);
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-[#e55a1d]"
                  >
                    <motion.div whileHover={{ rotate: 15 }}>
                      <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    </motion.div>
                  </motion.div>

                  {/* Account Modal */}
                  {showAccountModal && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[60]">
                      <Account isVisible={true} />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Not Logged-in User Dropdown */}
                  <div ref={userDropdownRef}>
                    <motion.button
                      onClick={toggleUserDropdown}
                      className="flex items-center gap-1 cursor-pointer p-2 sm:px-2 sm:py-1 rounded-lg transition-all duration-300"
                      whileHover={{ backgroundColor: "#e55a1d", scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div whileHover={{ rotate: 15 }}>
                        <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                      </motion.div>

                      <motion.div animate={{ rotate: isUserDropdownOpen ? 180 : 0 }}>
                        <ChevronDown className="hidden sm:block h-4 w-4" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {isUserDropdownOpen && (
                        <motion.div
                          className="absolute mt-2 origin-top-right right-0 w-64 max-[767px]:fixed max-[767px]:top-[70px] max-[767px]:right-4 max-[767px]:w-[calc(100vw-2rem)] max-[767px]:max-w-[320px]"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {/* Login/Signup Dropdown Content */}
                          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-[60]">
                            <div className="p-4 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
                              <h3 className="text-white font-medium text-lg">Welcome</h3>
                              <p className="text-white/90 text-sm">Access your account</p>
                            </div>

                            <div className="divide-y divide-gray-100">
                              <motion.div
                                onClick={() => handleNavigation('/login')}
                                className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item cursor-pointer"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                custom={0}
                                whileHover={{ backgroundColor: "#f9fafb", x: 5 }}
                              >
                                <motion.div
                                  className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20"
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                  <LogIn className="h-5 w-5 text-[#fe6522]" />
                                </motion.div>
                                <div>
                                  <p className="font-medium">Log In</p>
                                </div>
                              </motion.div>

                              <motion.div
                                onClick={() => handleNavigation('/signup')}
                                className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item cursor-pointer"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                custom={1}
                                whileHover={{ backgroundColor: "#f9fafb", x: 5 }}
                              >
                                <motion.div
                                  className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20"
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                  <UserPlus className="h-5 w-5 text-[#fe6522]" />
                                </motion.div>
                                <div>
                                  <p className="font-medium">Sign Up</p>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>

            {/* Nav Dropdown */}
            <div
              ref={navDropdownRef}
              className="relative group"
              onMouseEnter={() => !isMobile && setIsNavDropdownOpen(true)}
              onMouseLeave={() => !isMobile && setIsNavDropdownOpen(false)}
            >
              <motion.button
                onClick={toggleNavDropdown}
                className="cursor-pointer p-2 rounded-lg transition-colors duration-300"
                whileHover={{ backgroundColor: "#e55a1d", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div whileHover={{ rotate: 90 }}>
                  <Menu className="h-5 w-6 sm:h-6 sm:w-7 md:h-7 md:w-8" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isNavDropdownOpen && (
                  <motion.div
                    className="absolute mt-2 origin-top-right right-0 w-64 max-[767px]:fixed max-[767px]:top-[70px] max-[767px]:right-4 max-[767px]:w-[calc(100vw-2rem)] max-[767px]:max-w-[320px]"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-[60]">
                      <div className="p-4 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
                        <h3 className="text-white font-medium text-lg">Explore</h3>
                        <p className="text-white/90 text-sm">Navigate our site</p>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {[{
                          icon: <BookOpen className="h-5 w-5 text-[#fe6522]" />,
                          label: "Blog"
                        }, {
                          icon: <Users className="h-5 w-5 text-[#fe6522]" />,
                          label: "About Us"
                        }, {
                          icon: <Contact className="h-5 w-5 text-[#fe6522]" />,
                          label: "Contact"
                        }, {
                          icon: <Handshake className="h-5 w-5 text-[#fe6522]" />,
                          label: "Our Partners"
                        }].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item cursor-pointer"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                            whileHover={{ backgroundColor: "#f9fafb", x: 5 }}
                          >
                            <motion.div
                              className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              {item.icon}
                            </motion.div>
                            <div>
                              <p className="font-medium">{item.label}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;