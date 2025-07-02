import React, { useState, useEffect, useRef } from "react";
import { Home, Grid, User, ShoppingCart, Search, Heart, ChevronDown, Globe } from "lucide-react";
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
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const currencyRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

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
      if (isCurrencyOpen && !currencyRef.current?.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileVisible, isMobile, isCurrencyOpen]);

  const mobileTabs = [
    { icon: Home, label: "Home" },
    { icon: Grid, label: "Browse" },
    { icon: ShoppingCart, label: "Cart" },
    { icon: User, label: "Profile" },
  ];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
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
          <Account isVisible={true} onClose={() => setActiveTab("Home")} />
        ) : null;
      default:
        return null;
    }
  };

  const handleProfileClick = () => {
    if (isMobile) {
      setActiveTab("Profile");
    } else {
      setIsProfileVisible(!isProfileVisible);
    }
  };

  const handleProfileMouseEnter = () => {
    if (!isMobile) {
      setIsProfileVisible(true);
    }
  };

  const handleProfileMouseLeave = () => {
    if (!isMobile) {
      setIsProfileVisible(false);
    }
  };

  const handleAccountClose = () => {
    setIsProfileVisible(false);
  };

  const handleDropdownMouseEnter = () => {
    if (!isMobile) {
      setIsProfileVisible(true);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      setIsProfileVisible(false);
    }
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.code);
    setIsCurrencyOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 bg-[#ff6523] backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center space-x-8 w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-6">
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

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search for saffron, spices..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/90 border border-white focus:border-[#ff6523]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6523]/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#ff6523] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#e55b1f] transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            {/* Currency Selector */}
            <div className="relative" ref={currencyRef}>
              <button
                className="flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-black/10 transition-colors"
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">{selectedCurrency}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCurrencyOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isCurrencyOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-1">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      className={`w-full text-left px-4 py-2 hover:bg-[#ff6523]/10 flex items-center ${selectedCurrency === currency.code ? 'bg-[#ff6523]/10 text-[#ff6523]' : 'text-gray-800'}`}
                      onClick={() => handleCurrencySelect(currency)}
                    >
                      <span className="font-medium mr-2">{currency.symbol}</span>
                      <span>{currency.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button 
              className="p-2 text-black transition-colors relative group"
              onClick={() => navigate('/wishlist')}
            >
              <Heart className="h-6 w-6 transition-colors" />
              <span className="absolute -top-1 -right-1 text-white bg-[#ff6523] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                5
              </span>
            </button>

            {/* Cart */}
            <button
              className="p-2 text-black transition-colors relative"
              onClick={() => setActiveTab("Cart")}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 text-white bg-[#ff6523] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Profile */}
            <div 
              className="relative" 
              ref={profileButtonRef}
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              <button
                className={`p-2 text-black transition-colors rounded-lg ${
                  isProfileVisible ? 'bg-black/10' : 'hover:bg-black/10'
                }`}
                onClick={handleProfileClick}
              >
                <User className="h-6 w-6" />
              </button>
              
              {!isMobile && isProfileVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full pt-2 z-50"
                >
                  <Account
                    isVisible={isProfileVisible}
                    onClose={handleAccountClose}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Images */}
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
                   object-cover z-30 transition-transform duration-700 ease-out"
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