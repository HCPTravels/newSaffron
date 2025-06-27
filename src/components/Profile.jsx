import React from "react";
import { House, LayoutDashboard, UserRoundMinus, ShoppingCart } from "lucide-react";

const Profile = () => {
  const icons = [
    { icon: House, label: "Home" },
    { icon: LayoutDashboard, label: "Categories" },
    { icon: UserRoundMinus, label: "Profile", active: true }, // Mark active tab
    { icon: ShoppingCart, label: "Cart" }
  ];

  return (
    <div className="fixed inset-x-0 bottom-50 z-50">
      <div className="flex bg-white shadow-lg border-t border-gray-100">
        {icons.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 cursor-pointer transition-colors duration-200 
                ${item.active ? 'text-[#ff6523]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <div className={`p-2 rounded-full ${item.active ? 'bg-[#ff6523]/10' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;