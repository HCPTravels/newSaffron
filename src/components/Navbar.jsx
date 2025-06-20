import React, { useState } from "react";
import Subtract from "../assets/Subtract.png";
import { User, Menu, LogIn, UserPlus, ChevronDown, BookOpen, Users, Handshake , Contact} from "lucide-react";

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);

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
          
          <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-10">
            {/* User Dropdown (with chevron) */}
            <div 
              className="hidden sm:block relative group"
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg hover:bg-[#e55a1d] transition-all duration-300">
                <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              <div className={`absolute right-0 mt-2 w-64 origin-top-right transition-all duration-300 ease-out ${isUserDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-[60]">
                  <div className="p-4 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
                    <h3 className="text-white font-medium text-lg">Welcome</h3>
                    <p className="text-white/90 text-sm">Access your account</p>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    <a
                      href="#login"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 transition-all duration-200 group/item"
                    >
                      <div className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors">
                        <LogIn className="h-5 w-5 text-[#fe6522]" />
                      </div>
                      <div>
                        <p className="font-medium">Log In</p>
                      </div>
                    </a>
                    
                    <a
                      href="#signup"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 transition-all duration-200 group/item"
                    >
                      <div className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors">
                        <UserPlus className="h-5 w-5 text-[#fe6522]" />
                      </div>
                      <div>
                        <p className="font-medium">Sign Up</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Dropdown (without chevron) */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsNavDropdownOpen(true)}
              onMouseLeave={() => setIsNavDropdownOpen(false)}
            >
              <button className="cursor-pointer p-2 rounded-lg hover:bg-[#e55a1d] transition-colors duration-300">
                <Menu className="h-5 w-6 sm:h-6 sm:w-7 md:h-7 md:w-8" />
              </button>
              
              <div className={`absolute right-0 mt-2 w-64 origin-top-right transition-all duration-300 ease-out ${isNavDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-[60]">
                  <div className="p-4 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
                    <h3 className="text-white font-medium text-lg">Explore</h3>
                    <p className="text-white/90 text-sm">Navigate our site</p>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    <a
                      href="#blog"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 transition-all duration-200 group/item"
                    >
                      <div className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors">
                        <BookOpen className="h-5 w-5 text-[#fe6522]" />
                      </div>
                      <div>
                        <p className="font-medium">Blog</p>
                      </div>
                    </a>
                    
                    <a
                      href="#about"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 transition-all duration-200 group/item"
                    >
                      <div className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors">
                        <Users className="h-5 w-5 text-[#fe6522]" />
                      </div>
                      <div>
                        <p className="font-medium">About Us</p>
                      </div>
                    </a>
                    
                    <a
                      href="#contact"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 transition-all duration-200 group/item"
                    >
                      <div className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors">
                        <Contact className="h-5 w-5 text-[#fe6522]" />
                      </div>
                      <div>
                        <p className="font-medium">Contact</p>
                      </div>
                    </a>
                    
                    <a
                      href="#partners"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 transition-all duration-200 group/item"
                    >
                      <div className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20 transition-colors">
                        <Handshake className="h-5 w-5 text-[#fe6522]" />
                      </div>
                      <div>
                        <p className="font-medium">Our Partners</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;