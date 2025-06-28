import React, { useState } from "react";
import {
  Home,
  Grid,
  User,
  ShoppingCart,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import saffronLogo from "../assets/saffron logo.png";

import HomePage from "../pages/Homepage"; // Replace with actual content
import CartPage from "../pages/Cart"; // Replace with actual content
import UserProfilePage from "../pages/Account"; // Replace with actual content
// import BrowsePage from "./BrowsePage";
// import CartPage from "./CartPage";
// import UserProfilePage from "./UserProfilePage";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

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
        return <BrowsePage />;
      case "Cart":
        return <CartPage />;
      case "Profile":
        return <UserProfilePage />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 bg-[#ff6523] backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center space-x-8 w-full max-w-6xl mx-auto">
          {/* Logo with adjacent search */}
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

            {/* Search Bar */}
            {/* <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pl-10 text-black rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6523]/50 focus:border-[#ff6523]"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            </div> */}
          </div>

          {/* Desktop Icons */}
          <div className="flex items-center space-x-6">
            <button
              className="p-2 text-black transition-colors relative"
              onClick={() => setActiveTab("Cart")}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 text-white bg-[#ff6523] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button
              className="p-2 text-black transition-colors"
              onClick={() => setActiveTab("Profile")}
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="min-h-screen bg-[#ff6523] pt-4 pb-24 px-4">
        {renderActiveTabContent()}
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 px-6 pb-4 pt-2">
        <div className="flex relative bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-xl">
          {/* Active Indicator
          <div
            className="absolute bottom-0 h-[2px] ml-4 bg-[#ff6523] rounded-full transition-all duration-300"
            style={{
              width: `${60 / mobileTabs.length}%`,
              left: `${
                mobileTabs.findIndex((tab) => tab.label === activeTab) *
                (60 / mobileTabs.length)
              }%`,
            }}
          /> */}

          {mobileTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.label)}
              className={`flex-1 py-3 flex flex-col items-center justify-center transition-all duration-200 ${
                activeTab === tab.label
                  ? "text-[#ff6523]"
                  : "text-gray-600"
              }`}
            >
              <div className="relative">
                <tab.icon
                  className={`w-5 h-5 transition-transform ${
                    activeTab === tab.label ? "scale-110" : "scale-100"
                  }`}
                />
                {activeTab === tab.label && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#ff6523] rounded-full" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 pt-1 tracking-tight transition-all ${
                  activeTab === tab.label
                    ? "font-semibold scale-105"
                    : "font-medium scale-100"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;