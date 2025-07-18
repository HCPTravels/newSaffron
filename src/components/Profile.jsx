import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Grid,
  User,
  ShoppingCart,
  Search,
  Heart,
  ChevronDown,
  Globe,
  Package,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import saffronLogo from "../assets/saffron logo.png";
import HomePage from "../pages/Homepage";
import Cart from "../pages/Cart";
import Account from "./Account";
import Categories from "../pages/Categories";
import Wishlist from "./Wishlisht";
import SaffronHome from "../assets/saffronHome.png";
import ProductDetails from "./ProductDetails";
import { useCart } from "../context/CartContext";
import { useWishlist } from '../context/WishlistContext';
import Order from "../pages/Order";

// --- ProfileNavbar component ---
function ProfileNavbar({
  selectedCurrency,
  setSelectedCurrency,
  isCurrencyOpen,
  setIsCurrencyOpen,
  isProfileVisible,
  setIsProfileVisible,
  handleProfileClick,
  handleProfileMouseEnter,
  handleProfileMouseLeave,
  handleAccountClose,
  handleDropdownMouseEnter,
  handleDropdownMouseLeave,
  currencyRef,
  profileButtonRef,
  dropdownRef,
  getWishlistCount,
  getTotalItems,
  isMobile,
  Account,
  navigate,
  currencies
}) {
  return (
    <div className="hidden md:flex items-center justify-between px-8 py-4 bg-[#ff6523] backdrop-blur-sm fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center space-x-8 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <div
            className="text-2xl font-bold text-black cursor-pointer whitespace-nowrap"
            onClick={() => navigate("/profile")}
          >
            <img
              src={saffronLogo}
              alt="Saffron Logo"
              className="h-[50px] w-[60px] sm:h-[60px] sm:w-[72px] md:h-[65px] md:w-[80px] lg:h-[72px] lg:w-[87px]"
            />
          </div>
        </div>
        {/* Right-aligned Navbar Items (no search bar) */}
        <div className="flex items-center space-x-6 ml-auto">
          {/* Currency Selector */}
          <div className="relative" ref={currencyRef}>
            <button
              className="flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-black/10 transition-colors"
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
            >
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">{selectedCurrency}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isCurrencyOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {isCurrencyOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-1">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    className={`w-full text-left px-4 py-2 hover:bg-[#ff6523]/10 flex items-center ${
                      selectedCurrency === currency.code
                        ? "bg-[#ff6523]/10 text-[#ff6523]"
                        : "text-gray-800"
                    }`}
                    onClick={() => {
                      setSelectedCurrency(currency.code);
                      setIsCurrencyOpen(false);
                    }}
                  >
                    <span className="font-medium mr-2">
                      {currency.symbol}
                    </span>
                    <span>{currency.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Wishlist */}
          <button
            className="p-2 text-black transition-colors relative group"
            onClick={() => navigate("/profile/wishlist")}
          >
            <Heart className="h-6 w-6 transition-colors" />
            <span className="absolute -top-1 -right-1 text-white bg-[#ff6523] text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getWishlistCount()}
            </span>
          </button>
          {/* Cart */}
          <button
            className="p-2 text-black transition-colors relative"
            onClick={() => navigate("/profile/cart")}
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 text-white bg-[#ff6523] text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems}
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
                isProfileVisible ? "bg-black/10" : "hover:bg-black/10"
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
  );
}

// --- Main Profile component ---
const NAVBAR_HEIGHT = 88; // px, adjust if needed (py-4 + logo height)

const Profile = () => {
  const location = useLocation();
  const {wishlist, getWishlistCount} = useWishlist()
  const { cartItems, getTotalItems } = useCart();
  const navigate = useNavigate();
  const passedEmail = location.state?.email || "";
  const [scrollY, setScrollY] = useState(0);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  // Set default currency to INR and only allow INR and USD
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const currencyRef = useRef(null);
  const { user } = useAuth();
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Handle route redirects for standalone routes
  useEffect(() => {
    const path = location.pathname;
    if (path === '/cart') {
      navigate('/profile/cart', { replace: true });
    } else if (path === '/homepage') {
      navigate('/profile', { replace: true });
    } else if (path === '/categories') {
      navigate('/profile/categories', { replace: true });
    } else if (path === '/account') {
      navigate('/profile/account', { replace: true });
    } else if (path === '/wishlist') {
      navigate('/profile/wishlist', { replace: true });
    } else if (path === '/orders') {
      navigate('/profile/orders', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Get current tab based on URL
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.includes("/profile/cart")) return "Cart";
    if (path.includes("/profile/categories")) return "Browse";
    if (path.includes("/profile/account")) return "Profile";
    if (path.includes("/profile/wishlist")) return "Wishlist";
    if (path.includes("/profile/orders")) return "Orders";
    return "Home"; // Default to Home
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab());

  useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location.pathname]);

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
    { icon: Home, label: "Home", path: "/profile" },
    // { icon: Grid, label: "Browse", path: "/profile/categories" }, // Browse tab commented out
    { icon: Heart, label: "Wishlist", path: "/profile/wishlist" },
    { icon: ShoppingCart, label: "Cart", path: "/profile/cart" },
    { icon: Package, label: "Orders", path: "/profile/orders" },
    { icon: User, label: "Profile", path: "/profile/account" },
  ];

  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
  ];

  const handleProfileClick = () => {
    if (isMobile) {
      navigate("/profile/account");
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

  const handleTabClick = (tab) => {
    navigate(tab.path);
    setActiveTab(tab.label);
  };

  // Check if current route is cart or wishlist
  const isCartRoute = location.pathname.includes("/profile/cart");
  const isWishlistRoute = location.pathname.includes("/profile/wishlist");
  const isOrdersRoute = location.pathname.includes("/profile/orders");

  return (
    <>
      <ProfileNavbar
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        isCurrencyOpen={isCurrencyOpen}
        setIsCurrencyOpen={setIsCurrencyOpen}
        isProfileVisible={isProfileVisible}
        setIsProfileVisible={setIsProfileVisible}
        handleProfileClick={handleProfileClick}
        handleProfileMouseEnter={handleProfileMouseEnter}
        handleProfileMouseLeave={handleProfileMouseLeave}
        handleAccountClose={handleAccountClose}
        handleDropdownMouseEnter={handleDropdownMouseEnter}
        handleDropdownMouseLeave={handleDropdownMouseLeave}
        currencyRef={currencyRef}
        profileButtonRef={profileButtonRef}
        dropdownRef={dropdownRef}
        getWishlistCount={getWishlistCount}
        getTotalItems={getTotalItems}
        isMobile={isMobile}
        Account={Account}
        navigate={navigate}
        currencies={currencies}
      />
      {/* Add top padding to push content below the fixed navbar */}
      <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
        {/* Decorative images always visible on all profile subpages */}
        <img
          src={SaffronHome}
          alt="Saffron Home"
          className="absolute left-full fixed opacity-30
                     w-[200px] h-[200px] xs:w-[250px] xs:h-[250px]
                     sm:w-[300px] sm:h-[300px]
                     md:w-[400px] md:h-[400px]
                     lg:w-[500px] lg:h-[500px]
                     xl:w-[550px] xl:h-[550px]
                     2xl:w-[767px] 2xl:h-[767px]
                     object-cover z-11 transition-transform duration-700 ease-out pointer-events-none"
          style={{ transform: `translateX(-50%) translateY(${scrollY * 0.3}px)` }}
        />
        <img
          src={SaffronHome}
          alt="Decorative Saffron"
          className="fixed bottom-[-75px] left-[-75px] w-[150px] h-[150px]
                 md:top-[586px] md:left-[-154px] md:w-[375px] md:h-[375px]
                 object-cover pointer-events-none opacity-30 z-11 transition-transform duration-700 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * 0.1}deg)`,
          }}
        />
        {/* Main Page Content */}
        <div className={`min-h-screen pt-4 pb-24 px-4 relative z-10`}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                selectedProductId ? (
                  <ProductDetails
                    id={selectedProductId}
                    onBack={() => setSelectedProductId(null)}
                  />
                ) : (
                  <HomePage onSelectProduct={setSelectedProductId} />
                )
              }
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={
              <div className="max-w-7xl mx-auto">
                <Cart />
              </div>
            } />
            <Route path="/wishlist" element={
              <div className="max-w-7xl mx-auto">
                <Wishlist />
              </div>
            } />
            <Route path="/orders" element={<Order />} />
            <Route path="/account" element={<Account isVisible={true} />} />
          </Routes>
        </div>
      </div>

      {/* Mobile Bottom Tab */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 px-4 pb-6 pt-2">
        <div className="flex relative bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
          <div
            className="absolute top-2 bottom-2 bg-gradient-to-r from-[#ff6523]/20 to-[#ff6523]/30 rounded-xl transition-all duration-500 ease-out"
            style={{
              left: `${
                mobileTabs.findIndex((tab) => tab.label === activeTab) * 20 + 2
              }%`,
              width: "16%",
              transform: `translateY(${Math.sin(Date.now() * 0.001) * 1}px)`,
            }}
          />

          {mobileTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(tab)}
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
                    {cartItems.length}
                  </span>
                )}

                {tab.label === "Wishlist" && (
                  <span className="absolute -top-2 -right-2 text-white bg-gradient-to-r from-[#ff6523] to-[#ff8547] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-md">
                  {wishlist?.length}
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