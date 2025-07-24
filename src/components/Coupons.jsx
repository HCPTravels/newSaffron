import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tag, Copy, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Coupons = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  // Mock data for coupons - in a real app, this would come from an API
  const coupons = [
    {
      id: 1,
      code: "SAFFRON10",
      discount: "10%",
      description: "Get 10% off on all saffron products",
      validUntil: "2024-12-31",
      minOrder: "₹500",
      isActive: true,
    },
    {
      id: 2,
      code: "WELCOME20",
      discount: "20%",
      description: "New customer special - 20% off first order",
      validUntil: "2024-11-30",
      minOrder: "₹1000",
      isActive: true,
    },
    {
      id: 3,
      code: "BULK15",
      discount: "15%",
      description: "15% off on bulk orders above ₹2000",
      validUntil: "2024-12-15",
      minOrder: "₹2000",
      isActive: true,
    },
    {
      id: 4,
      code: "FREESHIP",
      discount: "Free Shipping",
      description: "Free shipping on orders above ₹1500",
      validUntil: "2024-12-20",
      minOrder: "₹1500",
      isActive: false,
    },
  ];

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Coupons</h1>
            <p className="text-gray-600">Available discount codes and offers</p>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon, index) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-xl shadow-md overflow-hidden border-2 ${
                coupon.isActive
                  ? "border-orange-200 hover:border-orange-300"
                  : "border-gray-200 opacity-60"
              }`}
            >
              {/* Coupon Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    <span className="font-semibold">{coupon.discount}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-90">Min Order</div>
                    <div className="font-semibold">{coupon.minOrder}</div>
                  </div>
                </div>
              </div>

              {/* Coupon Body */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {coupon.description}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Valid until {formatDate(coupon.validUntil)}
                </p>

                {/* Coupon Code */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-lg font-bold text-gray-800">
                      {coupon.code}
                    </code>
                    {coupon.isActive && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(coupon.code)}
                        className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      coupon.isActive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      coupon.isActive ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {coupon.isActive ? "Active" : "Expired"}
                  </span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-8 h-8 bg-white rounded-full -translate-x-4 -translate-y-4 border-2 border-gray-200" />
              <div className="absolute top-0 right-0 w-8 h-8 bg-white rounded-full translate-x-4 -translate-y-4 border-2 border-gray-200" />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {coupons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No coupons available
            </h3>
            <p className="text-gray-500">
              Check back later for new offers and discounts!
            </p>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            How to use coupons
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Copy the coupon code you want to use</p>
            <p>• Add items to your cart</p>
            <p>• Apply the code during checkout</p>
            <p>• Enjoy your discount!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Coupons; 