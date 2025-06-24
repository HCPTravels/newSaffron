import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Subtract from "../assets/Subtract.png";
import { User, Menu, LogIn, UserPlus, ChevronDown, BookOpen, Users, Handshake, Contact } from "lucide-react";

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const navDropdownRef = useRef(null);

  // Toggle functions for mobile touch
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  const toggleNavDropdown = () => setIsNavDropdownOpen(!isNavDropdownOpen);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target)) {
        setIsNavDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: "easeOut"
      }
    })
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 h-[60px] sm:h-[70px] md:h-[80px] lg:h-[100px] bg-[#fe6522] flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={Subtract} 
              alt="Logo" 
              className="h-[50px] w-[60px] sm:h-[60px] sm:w-[72px] md:h-[65px] md:w-[80px] lg:h-[72px] lg:w-[87px]" 
            />
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10">
            {/* User Dropdown - Always visible */}
            <div 
              ref={userDropdownRef}
              className="relative group"
              onMouseEnter={() => window.innerWidth >= 768 && setIsUserDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth >= 768 && setIsUserDropdownOpen(false)}
            >
              <motion.button 
                onClick={toggleUserDropdown}
                className="flex items-center gap-1 cursor-pointer p-2 sm:px-2 sm:py-1 rounded-lg transition-all duration-300"
                whileHover={{ 
                  backgroundColor: "#e55a1d",
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                </motion.div>
                <motion.div
                  animate={{ rotate: isUserDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="hidden sm:block h-4 w-4" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div 
                    className="absolute mt-2 origin-top-right
                               right-0 w-64
                               max-[767px]:fixed max-[767px]:top-[70px] max-[767px]:right-4 max-[767px]:w-[calc(100vw-2rem)] max-[767px]:max-w-[320px]"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-[60]">
                      <div className="p-4 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
                        <h3 className="text-white font-medium text-lg">Welcome</h3>
                        <p className="text-white/90 text-sm">Access your account</p>
                      </div>
                      
                      <div className="divide-y divide-gray-100">
                        <motion.a
                          href="#login"
                          className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={0}
                          whileHover={{ 
                            backgroundColor: "#f9fafb",
                            x: 5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.div 
                            className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <LogIn className="h-5 w-5 text-[#fe6522]" />
                          </motion.div>
                          <div>
                            <p className="font-medium">Log In</p>
                          </div>
                        </motion.a>
                        
                        <motion.a
                          href="#signup"
                          className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={1}
                          whileHover={{ 
                            backgroundColor: "#f9fafb",
                            x: 5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.div 
                            className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <UserPlus className="h-5 w-5 text-[#fe6522]" />
                          </motion.div>
                          <div>
                            <p className="font-medium">Sign Up</p>
                          </div>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Navigation Dropdown - Always visible */}
            <div 
              ref={navDropdownRef}
              className="relative group"
              onMouseEnter={() => window.innerWidth >= 768 && setIsNavDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth >= 768 && setIsNavDropdownOpen(false)}
            >
              <motion.button 
                onClick={toggleNavDropdown}
                className="cursor-pointer p-2 rounded-lg transition-colors duration-300"
                whileHover={{ 
                  backgroundColor: "#e55a1d",
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="h-5 w-6 sm:h-6 sm:w-7 md:h-7 md:w-8" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {isNavDropdownOpen && (
                  <motion.div 
                    className="absolute mt-2 origin-top-right
                               right-0 w-64
                               max-[767px]:fixed max-[767px]:top-[70px] max-[767px]:right-4 max-[767px]:w-[calc(100vw-2rem)] max-[767px]:max-w-[320px]"
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
                        <motion.a
                          href="#blog"
                          className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={0}
                          whileHover={{ 
                            backgroundColor: "#f9fafb",
                            x: 5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.div 
                            className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <BookOpen className="h-5 w-5 text-[#fe6522]" />
                          </motion.div>
                          <div>
                            <p className="font-medium">Blog</p>
                          </div>
                        </motion.a>
                        
                        <motion.a
                          href="#about"
                          className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={1}
                          whileHover={{ 
                            backgroundColor: "#f9fafb",
                            x: 5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.div 
                            className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Users className="h-5 w-5 text-[#fe6522]" />
                          </motion.div>
                          <div>
                            <p className="font-medium">About Us</p>
                          </div>
                        </motion.a>
                        
                        <motion.a
                          href="#contact"
                          className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={2}
                          whileHover={{ 
                            backgroundColor: "#f9fafb",
                            x: 5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.div 
                            className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Contact className="h-5 w-5 text-[#fe6522]" />
                          </motion.div>
                          <div>
                            <p className="font-medium">Contact</p>
                          </div>
                        </motion.a>
                        
                        <motion.a
                          href="#partners"
                          className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={3}
                          whileHover={{ 
                            backgroundColor: "#f9fafb",
                            x: 5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.div 
                            className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Handshake className="h-5 w-5 text-[#fe6522]" />
                          </motion.div>
                          <div>
                            <p className="font-medium">Our Partners</p>
                          </div>
                        </motion.a>
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