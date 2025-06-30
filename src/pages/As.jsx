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
  LogIn,
  UserPlus
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext for user info

const As = ({ isVisible }) => {
    // const {user} = useAuth(); 
  const menuItems = [
    { icon: <ShoppingBag className="h-4 w-4" />, label: "Orders" },
    { icon: <Heart className="h-4 w-4" />, label: "Wishlist" },
    { icon: <Tag className="h-4 w-4" />, label: "Coupons" },
    { icon: <HelpCircle className="h-4 w-4" />, label: "Help Center" },
    { icon: <MapPin className="h-4 w-4" />, label: "Addresses" },
    { icon: <Star className="h-4 w-4" />, label: "Reviews" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings" }
  ];
 
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 origin-top-right w-64 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-460"
        >
          {/* Header with gradient matching navbar */}
          <div className="p-4 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
            <h3 className="text-white font-medium text-lg">My Account</h3>
            <p className="text-white/90 text-sm">{`Hello! ${user?.firstName}`}</p>
          </div>

          {/* Menu items */}
          <div className="divide-y divide-gray-100">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center px-4 py-3 text-gray-800 transition-all duration-200 group/item cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.05, duration: 0.2 }
                }}
                whileHover={{ backgroundColor: "#f9fafb", x: 5 }}
              >
                <motion.div 
                  className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Login/Signup section */}
            <div className="p-2 bg-gray-50">
              <motion.div
                className="flex items-center px-4 py-2 text-gray-800 transition-all duration-200 group/item cursor-pointer"
                whileHover={{ backgroundColor: "#f9fafb", x: 5 }}
              >
                <motion.div 
                  className="p-2 mr-3 rounded-lg bg-[#fe6522]/10 group-hover/item:bg-[#fe6522]/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    
                  <LogOut className="h-4 w-4 text-[#fe6522]" />
                </motion.div>
                <div>
                  <p className="font-medium text-sm">Log Out</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default As;