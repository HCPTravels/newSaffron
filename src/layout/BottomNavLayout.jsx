// components/BottomNavLayout.jsx
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Grid, User, ShoppingCart, Search } from "lucide-react";
import saffronLogo from "../assets/saffron logo.png";

const BottomNavLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/")[1] || "home";
  const [activeTab, setActiveTab] = useState(currentTab.charAt(0).toUpperCase() + currentTab.slice(1));

  const mobileTabs = [
    { icon: Home, label: "Home" },
    { icon: Grid, label: "Browse" },
    { icon: ShoppingCart, label: "Cart" },
    { icon: User, label: "Profile" }
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center space-x-8 w-full max-w-6xl mx-auto">
          {/* Logo with search */}
          <div className="flex items-center space-x-6 flex-1">
            <div
              className="text-2xl font-bold text-[#ff6523] cursor-pointer whitespace-nowrap"
              onClick={() => {
                setActiveTab("Home");
                navigate("/");
              }}
            >
              <img src={saffronLogo} alt="Logo" className="h-10 w-auto" />
            </div>
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6523]/50 focus:border-[#ff6523]"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button
              className="p-2 text-gray-600 hover:text-[#ff6523] transition-colors relative"
              onClick={() => {
                setActiveTab("Cart");
                navigate("/cart");
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[#ff6523] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button
              className="p-2 text-gray-600 hover:text-[#ff6523] transition-colors"
              onClick={() => {
                setActiveTab("Profile");
                navigate("/profile");
              }}
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-16 md:pt-0">
        <Outlet />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 px-6 pb-4 pt-2">
        <div className="flex relative bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-xl">
          <div
            className="absolute bottom-0 h-[2px] bg-[#ff6523] rounded-full transition-all duration-300"
            style={{
              width: `${100 / mobileTabs.length}%`,
              left: `${mobileTabs.findIndex(tab => tab.label === activeTab) * (100 / mobileTabs.length)}%`
            }}
          />
          {mobileTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(tab.label);
                navigate(`/${tab.label.toLowerCase()}`);
              }}
              className={`flex-1 py-3 flex flex-col items-center justify-center transition-all duration-200 ${
                activeTab === tab.label ? 'text-[#ff6523]' : 'text-gray-600'
              }`}
            >
              <div className="relative">
                <tab.icon
                  className={`w-5 h-5 transition-transform ${
                    activeTab === tab.label ? 'scale-110' : 'scale-100'
                  }`}
                />
                {activeTab === tab.label && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#ff6523] rounded-full" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight transition-all ${
                  activeTab === tab.label ? 'font-semibold scale-105' : 'font-medium scale-100'
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

export default BottomNavLayout;