import React, { useMemo } from "react";
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
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const Account = ({ isVisible, onClose, onMouseEnter, onMouseLeave }) => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const { user, logout, email } = useAuth();

  const menuItems = useMemo(
    () => [
      { icon: <ShoppingBag size={20} />, label: "Orders", count: 3 },
      {
        icon: <Heart size={20} />,
        label: "Wishlist",
        count: wishlist?.length ?? "0",
        onClick: () => {
          navigate("/profile/wishlist");
          if (typeof onClose === "function") onClose();
        },
      },
      { icon: <Tag size={20} />, label: "Coupons" },
      { icon: <HelpCircle size={20} />, label: "Help Center" },
      { icon: <MapPin size={20} />, label: "Addresses" },
      { icon: <Star size={20} />, label: "Reviews" },
      { icon: <Settings size={20} />, label: "Settings" },
    ],
    [wishlist, navigate, onClose]
  );

  const handleItemClick = (label, customOnClick) => {
    console.log(`Clicked: ${label}`);
    if (typeof customOnClick === "function") customOnClick();
    else if (window.innerWidth < 768 && typeof onClose === "function") onClose();
  };

  const logoutHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await logout();
      localStorage.removeItem("email");
      navigate("/", { replace: true });
      if (typeof onClose === "function") onClose();
    } catch (error) {
      console.error("Logout failed:", error);
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
            className="fixed inset-0 z-50 md:hidden bg-black"
            onClick={onClose}
          />

          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed md:absolute bottom-0 mb-25 md:bottom-auto inset-x-0 md:inset-x-auto md:left-auto md:right-0 
                       md:top-0 max-h-[calc(100vh-8rem)] md:max-h-none
                       mx-4 md:mx-0 mb-6 md:mb-0 md:w-80 bg-white rounded-2xl 
                       shadow-xl md:shadow-2xl overflow-hidden border-0 md:border border-gray-200
                       z-50 md:z-[60] flex flex-col"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 md:p-6 bg-gradient-to-r from-[#ff6523] to-[#ff8547] flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  {user?.profilePicture}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-semibold text-lg truncate">
                    {user?.firstName || "Welcome"}
                  </h3>
                  <p className="text-white/90 text-sm truncate">
                    {user?.email || email || "No email provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="pb-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ backgroundColor: "#f97316", color: "#ffffff" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between px-5 py-2.5 
                               transition-all cursor-pointer hover:bg-orange-50 group"
                    onClick={() => handleItemClick(item.label, item.onClick)}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="p-2 rounded-lg bg-orange-100/50 text-[#ff6523] 
                                      group-hover:bg-white/20 group-hover:text-white">
                        {item.icon}
                      </div>
                      <span className="font-medium group-hover:text-white truncate">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full
                                         group-hover:bg-white group-hover:text-[#ff6523]">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight
                        className="text-gray-400 group-hover:text-white"
                        size={18}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-3 px-4 py-4
                           bg-[#ff6523] rounded-xl text-gray-700 border border-gray-200 font-medium
                           hover:bg-red-50 hover:border-red-300 hover:text-red-700 
                           transition-all text-sm"
                onClick={logoutHandler}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
              >
                <LogOut className="text-red-500" size={18} />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Account;