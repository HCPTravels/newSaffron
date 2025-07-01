import React, { useState, useEffect, useRef } from "react";
import { Home, Grid, User, ShoppingCart, Search, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import saffronLogo from "../assets/saffron logo.png";
import HomePage from "../pages/Homepage";
import CartPage from "../pages/Cart";
import Account from "../pages/Account";
import Categories from "../pages/Categories";
import SaffronHome from "../assets/saffronHome.png";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [scrollY, setScrollY] = useState(0);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ watch auth user state

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Click outside to close dropdown (desktop only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isMobile &&
        isProfileVisible &&
        !dropdownRef.current?.contains(event.target) &&
        !profileButtonRef.current?.contains(event.target)
      ) {
        setIsProfileVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileVisible, isMobile]);

  // ✅ Auto close Profile view when user logs out
  useEffect(() => {
    if (!user) {
      setIsProfileVisible(false);
      if (activeTab === "Profile") {
        setActiveTab("Home");
      }
    }
  }, [user]);

  const mobileTabs = [
    { icon: Home, label: "Home" },
    { icon: Grid, label: "Browse" },
    { icon: ShoppingCart, label: "Cart" },
    { icon: User, label: "Profile" },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomePage />;
      case "Browse":
        return <Categories />;
      case "Cart":
        return <CartPage />;
      case "Profile":
        return isMobile ? (
          user ? (
            <Account isVisible={true} onClose={() => setActiveTab("Home")} />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white/10 rounded-2xl mx-4 mt-8 p-8">
              <div className="text-center mb-8">
                <User className="h-16 w-16 text-white/70 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Welcome</h2>
                <p className="text-white/80">Please log in to access your account</p>
              </div>
              <div className="space-y-4 w-full max-w-sm">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center justify-center gap-3 bg-white text-[#ff6523] px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors"
                >
                  <LogIn className="h-5 w-5" />
                  Log In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="w-full flex items-center justify-center gap-3 bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  <UserPlus className="h-5 w-5" />
                  Sign Up
                </button>
              </div>
            </div>
          )
        ) : null;
      default:
        return null;
    }
  };

  // ✅ Handle profile button click (both mobile and desktop)
  const handleProfileClick = () => {
    if (isMobile) {
      setActiveTab("Profile");
    } else {
      // Desktop: toggle dropdown visibility
      setIsProfileVisible(!isProfileVisible);
    }
  };

  // ✅ Handle account dropdown close
  const handleAccountClose = () => {
    console.log("Account dropdown closing");
    setIsProfileVisible(false);
  };

  // ✅ Render login/signup dropdown when user is not logged in
  const renderAuthDropdown = () => {
    if (user) return null;

    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100 min-w-[280px]">
        <div className="p-4 bg-gradient-to-r from-[#ff6523] to-[#ff8547]">
          <h3 className="text-white font-medium text-lg">Welcome</h3>
          <p className="text-white/90 text-sm">Access your account</p>
        </div>

        <div className="divide-y divide-gray-100">
          <div
            onClick={() => {
              setIsProfileVisible(false);
              navigate('/login');
            }}
            className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="p-2 mr-3 rounded-lg bg-[#ff6523]/10 group-hover:bg-[#ff6523]/20 transition-colors">
              <LogIn className="h-5 w-5 text-[#ff6523]" />
            </div>
            <div>
              <p className="font-medium">Log In</p>
              <p className="text-sm text-gray-500">Access your account</p>
            </div>
          </div>

          <div
            onClick={() => {
              setIsProfileVisible(false);
              navigate('/signup');
            }}
            className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="p-2 mr-3 rounded-lg bg-[#ff6523]/10 group-hover:bg-[#ff6523]/20 transition-colors">
              <UserPlus className="h-5 w-5 text-[#ff6523]" />
            </div>
            <div>
              <p className="font-medium">Sign Up</p>
              <p className="text-sm text-gray-500">Create new account</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 bg-[#ff6523] backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center space-x-8 w-full max-w-6xl mx-auto">
          <div className="flex items-center space-x-6 flex-1">
            <div
              className="text-2xl font-bold text-black cursor-pointer whitespace-nowrap"
              onClick={() => setActiveTab("Home")}
            >
              <img
                src={saffronLogo}
                alt="Saffron Logo"
                className="h-[50px] w-[60px] sm:h-[60px] sm:w-[72px] md:h-[65px] md:w-[80px] lg:h-[72px] lg:w-[87px]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6 relative">
            <button
              className="p-2 text-black transition-colors relative"
              onClick={() => setActiveTab("Cart")}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 text-white bg-[#ff6523] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* ✅ Profile Button - Click only, no hover */}
            <div className="relative" ref={profileButtonRef}>
              <button
                className={`p-2 text-black transition-colors rounded-lg ${
                  isProfileVisible ? 'bg-black/10' : 'hover:bg-black/10'
                }`}
                onClick={handleProfileClick}
              >
                <User className="h-6 w-6" />
              </button>
              
              {/* ✅ Desktop Dropdown - Shows on click */}
              {!isMobile && isProfileVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full pt-2 z-50"
                >
                  {user ? (
                    <Account
                      isVisible={isProfileVisible}
                      onClose={handleAccountClose}
                    />
                  ) : (
                    renderAuthDropdown()
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative images */}
      <img
        src={SaffronHome}
        alt="Saffron Home"
        className="absolute left-full fixed opacity-30
                   w-[200px] h-[200px] xs:w-[250px] xs:h-[250px]
                   sm:w-[300px] sm:h-[300px]
                   md:w-[400px] md:h-[400px]
                   lg:w-[500px] lg:h-[500px]
                   xl:w-[700px] xl:h-[700px]
                   2xl:w-[767px] 2xl:h-[767px]
                   object-cover z-200 transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-50%) translateY(${scrollY * 0.3}px)` }}
      />

      <img
        src={SaffronHome}
        alt="Decorative Saffron"
        className="fixed bottom-[-75px] left-[-75px] w-[150px] h-[150px]
               md:top-[586px] md:left-[-154px] md:w-[375px] md:h-[375px]
               object-cover pointer-events-none opacity-30 z-200 transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * 0.1}deg)`,
        }}
      />

      {/* Main Page Content */}
      <div className="min-h-screen bg-[#ff6523] pt-4 pb-24 px-4 relative z-10">
        {renderActiveTabContent()}
      </div>

      {/* Mobile Bottom Tab */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 px-4 pb-6 pt-2">
        <div className="flex relative bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
          <div
            className="absolute top-2 bottom-2 bg-gradient-to-r from-[#ff6523]/20 to-[#ff6523]/30 rounded-xl transition-all duration-500 ease-out"
            style={{
              left: `${mobileTabs.findIndex((tab) => tab.label === activeTab) * 25 + 2}%`,
              width: "21%",
              transform: `translateY(${Math.sin(Date.now() * 0.001) * 1}px)`,
            }}
          />

          {mobileTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.label)}
              className={`flex-1 py-4 flex flex-col items-center justify-center transition-all duration-300 relative group ${
                activeTab === tab.label
                  ? "text-[#ff6523] scale-105"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              style={{
                transform:
                  activeTab === tab.label
                    ? `translateY(-2px) scale(1.05)`
                    : "translateY(0px) scale(1)",
              }}
            >
              <div
                className={`relative transition-all duration-300 ${
                  activeTab === tab.label ? "mb-1" : "mb-0.5"
                }`}
              >
                <tab.icon
                  className={`w-6 h-6 transition-all duration-300 ${
                    activeTab === tab.label
                      ? "scale-110 drop-shadow-sm"
                      : "scale-100 group-hover:scale-105"
                  }`}
                />

                {activeTab === tab.label && (
                  <>
                    <div className="absolute -inset-2 bg-[#ff6523]/10 rounded-full animate-ping opacity-75" />
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-gradient-to-r from-[#ff6523] to-[#ff8547] rounded-full shadow-lg" />
                  </>
                )}

                {tab.label === "Cart" && (
                  <span className="absolute -top-2 -right-2 text-white bg-gradient-to-r from-[#ff6523] to-[#ff8547] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-md animate-bounce">
                    3
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-wide transition-all duration-300 ${
                  activeTab === tab.label
                    ? "font-bold opacity-100 scale-105 text-[#ff6523]"
                    : "font-medium opacity-80 scale-100 group-hover:opacity-100"
                }`}
              >
                {tab.label}
              </span>
              <div className="absolute inset-0 rounded-xl bg-[#ff6523]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#ff6523]/30 to-transparent rounded-full" />
        </div>
      </div>
    </>
  );
};

export default Profile;