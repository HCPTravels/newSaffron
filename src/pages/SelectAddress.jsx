import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import PaymentGateway from "../components/PaymentGateway";
import { Loader2, Plus, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SelectAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { cartItems } = useCart();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [addresses, setAddresses] = useState(location.state?.addresses || []);
  const [loading, setLoading] = useState(!location.state?.addresses);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!addresses.length) {
      const fetchAddresses = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${backendUrl}/api/user/useraddress`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setAddresses(Array.isArray(data) ? data : []);
        } catch (err) {
          setAddresses([]);
        } finally {
          setLoading(false);
        }
      };
      fetchAddresses();
    }
  }, [addresses.length, backendUrl, token]);

  const handleProceed = () => {
    if (addresses[selectedIndex]) {
      setShowLoader(true);
      setShowPayment(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-[#ff6523]" />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-lg text-gray-900 font-semibold"
        >
          Loading addresses...
        </motion.p>
      </div>
    );
  }

  if (!addresses.length) {
          navigate("/dashboard/address");
    return null;
  }

  if (showPayment) {
    return (
      <>
        <PaymentGateway
          totalPrice={cartItems.reduce((total, item) => {
            const price = parseFloat(item?.productId?.price) || 0;
            const quantity = parseInt(item?.quantity) || 0;
            return total + price * quantity;
          }, 0)}
          onClose={() => { setShowPayment(false); setShowLoader(false); }}
          shippingAddress={addresses[selectedIndex]}
          onRazorpayReady={() => setShowLoader(false)}
        />
        <AnimatePresence>
          {showLoader && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-10 h-10 text-[#ff6523]" />
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-lg text-gray-900 font-semibold"
              >
                Preparing Payment Gateway...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Select Shipping Address</h1>
          <p className="text-gray-500 mt-2">Choose where you'd like your order delivered</p>
        </motion.div>

        <motion.div 
          className="grid gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence>
            {addresses.map((address, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={`bg-white rounded-xl shadow-sm p-6 text-left border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedIndex === idx
                    ? 'border-[#ff6523] shadow-md'
                    : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => setSelectedIndex(idx)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-lg text-[#ff6523] mb-1">
                      {address.firstName} {address.lastName}
                    </div>
                    <div className="text-gray-700 mb-1">
                      {address.address}, {address.city}, {address.state}, {address.pincode}
                    </div>
                    <div className="text-gray-600 text-sm mb-1">
                      {address.email} | {address.phone}
                    </div>
                    {address.landmark && (
                      <div className="text-gray-400 text-xs">Landmark: {address.landmark}</div>
                    )}
                  </div>
                  {selectedIndex === idx && (
                    <div className="bg-[#ff6523] text-white p-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className="px-6 py-3 bg-[#ff6523] hover:bg-[#e55a1f] text-white font-bold rounded-lg text-lg flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
            onClick={handleProceed}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Payment
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg text-lg flex items-center justify-center gap-2 transition-colors border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
            onClick={() => navigate("/dashboard/address")}
          >
            <Plus className="w-5 h-5" />
            Add New Address
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SelectAddress;