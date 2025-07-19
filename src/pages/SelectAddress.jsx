import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import PaymentGateway from "../components/PaymentGateway";
import { Loader2 } from "lucide-react";

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
        <Loader2 className="w-10 h-10 text-[#ff6523] animate-spin" />
        <p className="mt-6 text-lg text-gray-900 font-semibold">Loading addresses...</p>
      </div>
    );
  }

  if (!addresses.length) {
    navigate("/profile/address");
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
        {showLoader && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#ff6523] animate-spin" />
            <p className="mt-6 text-lg text-gray-900 font-semibold">Preparing Payment Gateway...</p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white rounded-xl">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Select Shipping Address</h1>
        <div className="grid gap-6 mb-8">
          {addresses.map((address, idx) => (
            <div
              key={idx}
              className={`bg-gray-50 rounded-xl shadow p-6 text-left border cursor-pointer transition-all ${selectedIndex === idx ? 'border-[#ff6523] ring-2 ring-[#ff6523]' : 'border-gray-200'}`}
              onClick={() => setSelectedIndex(idx)}
            >
              <div className="font-semibold text-lg text-[#ff6523] mb-1">
                {address.firstName} {address.lastName}
              </div>
              <div className="text-gray-700 mb-1">{address.address}, {address.city}, {address.state}, {address.pincode}</div>
              <div className="text-gray-600 text-sm mb-1">{address.email} | {address.phone}</div>
              {address.landmark && <div className="text-gray-400 text-xs">Landmark: {address.landmark}</div>}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-[#ff6523] text-white font-bold rounded-xl text-lg flex-1"
            onClick={handleProceed}
          >
            Proceed to Payment
          </button>
          <button
            className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl text-lg flex-1 border border-gray-300"
            onClick={() => navigate("/profile/address")}
          >
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectAddress; 