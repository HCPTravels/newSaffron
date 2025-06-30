import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ShoppingBag, 
  Heart, 
  Tag, 
  HelpCircle, 
  MapPin, 
  Star, 
  Settings,
  LogOut,
  ChevronRight,
  User
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Account = ({ isVisible, onClose }) => {
  const { user, logout } = useAuth();
  
  const menuItems = [
    { icon: <ShoppingBag size={20} />, label: "Orders", count: 3 },
    { icon: <Heart size={20} />, label: "Wishlist", count: 12 },
    { icon: <Tag size={20} />, label: "Coupons" },
    { icon: <HelpCircle size={20} />, label: "Help Center" },
    { icon: <MapPin size={20} />, label: "Addresses" },
    { icon: <Star size={20} />, label: "Reviews" },
    { icon: <Settings size={20} />, label: "Settings" }
  ];

  const handleItemClick = (label) => {
    console.log(`Clicked: ${label}`);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden "
            onClick={onClose}
          />

          {/* Account dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed md:absolute bottom-0 mb-25 md:mb-0 md:bottom-auto left-0 md:left-auto right-0 md:right-0 
                       md:top-full md:mt-2 h-[85vh] md:h-auto max-h-[700px] md:max-h-none
                       w-full md:w-72 bg-white rounded-t-3xl md:rounded-2xl 
                       shadow-xl md:shadow-lg overflow-hidden border border-white
                       z-50 md:z-[60] flex flex-col"
          >
            {/* Header with user info */}
            <div className="p-6 bg-[#ff6523]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {user?.firstName || "Welcome"}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {user?.email || "Sign in to your account"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items with scroll area */}
            <div className="flex-1 overflow-y-auto">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between px-6 py-4 md:py-2 
                             transition-colors duration-200 cursor-pointer active:bg-gray-100 "
                  onClick={() => handleItemClick(item.label)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-orange-100/50 dark:[#ff6523] text-[#ff6523]">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count && (
                      <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight className="text-gray-400" size={18} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer with logout - now part of the main container */}
            <div className="p-4 border-t">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 
                           rounded-xl text-gray-700 border border-[#ff6523] font-medium"
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                <LogOut className="text-[#ff6523]" size={20} />
                Sign Out
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Account;