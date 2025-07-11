import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Star,
  Zap,
  Loader2,
  Heart,
  Gift,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle,
  Package,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import PaymentGateway from "../components/PaymentGateway";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [estimatedDelivery] = useState("3-5 business days");
  const [showPayment, setShowPayment] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useAuth();

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${backendUrl}/api/cart/getcartproduct`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.items) {
        setCartItems(response.data.items);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart items");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchCartItems();
  }, [token]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    setUpdatingItem(productId);
    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      const response = await axios.patch(
        `${backendUrl}/api/cart/updatequantity/${productId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        }
      );

      // 3. Verify and update with backend response
      if (response.data?.success && response.data?.cart?.items) {
        setCartItems(response.data.cart.items);
        toast.success("Quantity updated");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Update error:", error);

      // Specific error messages
      let errorMessage = "Failed to update quantity";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Request timed out";
      } else if (error.request) {
        errorMessage = "No response from server";
      }

      toast.error(errorMessage);
      fetchCartItems(); // Revert to server state
    } finally {
      setUpdatingItem(null);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    setRemovingItem(productId);
    try {
      // Optimistic UI update
      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );

      await axios.delete(`${backendUrl}/api/cart/removeitem/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Item removed");
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Failed to remove item");
      fetchCartItems(); // Revert to actual data
    } finally {
      setRemovingItem(null);
    }
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "saffron10") {
      setDiscount(10);
      setPromoApplied(true);
      toast.success("10% discount applied!");
    } else if (promoCode.toLowerCase() === "premium20") {
      setDiscount(20);
      setPromoApplied(true);
      toast.success("20% discount applied!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  // Calculate order totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = item?.productId?.price || 0;
    const quantity = item?.quantity || 0;
    return total + price * quantity;
  }, 0);

  const discountAmount = (subtotal * discount) / 100;

  // ✅ THIS IS THE MISSING LINE:
  const shipping = subtotal > 2000 ? 0 : 150;

  const total = subtotal - discountAmount + shipping;

  // Get styling for product grade badges
  const getGradeBadge = (grade) => {
    const badges = {
      premium: {
        className: "bg-gradient-to-r from-amber-500 to-[#ff6523] text-white",
        icon: <Zap className="w-3 h-3 mr-1" />,
        text: "Premium",
      },
      category1: {
        className: "bg-gradient-to-r from-[#ff6523] to-orange-500 text-white",
        text: "Category I",
      },
      category2: {
        className: "bg-gradient-to-r from-orange-400 to-amber-500 text-white",
        text: "Category II",
      },
      category3: {
        className: "bg-gradient-to-r from-amber-400 to-yellow-500 text-white",
        text: "Category III",
      },
      default: {
        className: "bg-gray-200 text-gray-800",
        text: "Standard",
      },
    };

    return badges[grade] || badges.default;
  };

  // Loading state component
  const LoadingState = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        className="relative mb-8"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-100 to-[#ff6523] flex items-center justify-center shadow-lg">
          <ShoppingCart className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -inset-4 border-4 border-amber-200/30 rounded-full animate-ping"></div>
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Loading your cart...
      </h3>
      <p className="text-gray-600">Gathering your precious saffron selection</p>
    </motion.div>
  );

  // Empty cart state component
  const EmptyCart = () => (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="w-24 h-24 bg-gradient-to-r from-amber-100 to-[#ff6523] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <ShoppingCart className="w-12 h-12 text-white" />
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Your cart is empty
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Discover our premium collection of saffron from Kashmir, Iran, and
        Spain.
      </p>
      <motion.button
        className="px-8 py-3 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => (window.location.href = "/")}
      >
        Start Shopping
      </motion.button>
    </motion.div>
  );

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pt-20">
        <LoadingState />
      </div>
    );
  }

  // Render login prompt if not authenticated
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pt-20">
        <div className="max-w-md mx-auto text-center py-20">
          <AlertCircle className="w-16 h-16 text-[#ff6523] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Sign In
          </h2>
          <p className="text-gray-600 mb-8">
            You need to sign in to view your cart
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-semibold rounded-lg">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Render empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pt-20">
        <EmptyCart />
      </div>
    );
  }

  // Main cart UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pt-20">
      <Toaster richColors closeButton />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Saffron Collection
          </h1>
          <p className="text-gray-600 text-lg">
            Premium saffron threads, carefully curated
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-xl border-2 border-amber-100 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100 border-b-2 border-amber-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-[#ff6523]" />
                  Cart Items ({cartItems.length})
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <AnimatePresence>
                  {cartItems.map((item) => {
                    const product = item?.productId;

                    if (!product) {
                      return (
                        <div
                          key={item._id || Math.random()}
                          className="p-6 bg-red-50 text-red-700 border border-red-300 rounded-lg"
                        >
                          ⚠️ Product details missing. Please try again later.
                        </div>
                      );
                    }

                    const gradeBadge = getGradeBadge(product.grade);

                    return (
                      <motion.div
                        key={product._id}
                        className="flex items-center gap-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                          <div className="text-4xl font-black text-amber-400/40">
                            {product.origin?.charAt(0) || "S"}
                          </div>
                          <motion.span
                            className={`absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${gradeBadge.className}`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {gradeBadge.icon}
                            {gradeBadge.text}
                          </motion.span>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-sm font-medium text-gray-600">
                              Origin: {product.origin}
                            </span>
                            {product.crocin && (
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                                {product.crocin} Crocin
                              </span>
                            )}
                            {product.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium text-gray-600">
                                  {product.rating}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="text-2xl font-bold text-[#ff6523]">
                            ₹{product.price}
                            <span className="text-sm text-gray-500 font-normal ml-1">
                              per gram
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <motion.button
                            className="w-10 h-10 bg-white border-2 border-amber-200 rounded-full flex items-center justify-center hover:bg-amber-50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              const newQuantity = item.quantity - 1;
                              if (newQuantity >= 1) {
                                // Additional client-side validation
                                updateQuantity(product._id, newQuantity);
                              }
                            }}
                            disabled={
                              item.quantity <= 1 || updatingItem === product._id
                            }
                          >
                            {updatingItem === product._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Minus className="w-4 h-4 text-gray-600" />
                            )}
                          </motion.button>

                          <div className="w-16 h-10 bg-white border-2 border-amber-200 rounded-lg flex items-center justify-center font-bold text-gray-900">
                            {updatingItem === product._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              item.quantity
                            )}
                          </div>

                          <motion.button
                            className="w-10 h-10 bg-white border-2 border-amber-200 rounded-full flex items-center justify-center hover:bg-amber-50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(product._id, item.quantity + 1)
                            }
                            disabled={updatingItem === product._id}
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </motion.button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ₹{(product.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.quantity} gram{item.quantity > 1 ? "s" : ""}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          className="w-10 h-10 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(product._id)}
                          disabled={removingItem === product._id}
                        >
                          {removingItem === product._id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-500" />
                          )}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-6">
            {/* Promo Code */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl border-2 border-amber-100 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#ff6523]" />
                Promo Code
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-[#ff6523] transition-colors"
                  disabled={promoApplied}
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: promoApplied ? 1 : 1.05 }}
                  whileTap={{ scale: promoApplied ? 1 : 0.95 }}
                  onClick={applyPromoCode}
                  disabled={promoApplied || !promoCode}
                >
                  {promoApplied ? <CheckCircle className="w-4 h-4" /> : "Apply"}
                </motion.button>
              </div>
              {promoApplied && (
                <motion.div
                  className="mt-3 flex items-center gap-2 text-green-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {discount}% discount applied!
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl border-2 border-amber-100 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#ff6523]" />
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span className="font-semibold">
                      -₹{discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="border-t-2 border-amber-100 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#ff6523]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                className="w-full mt-6 py-4 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPayment(true)}
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
            {showPayment && (
              <PaymentGateway
                totalPrice={total}
                onClose={() => setShowPayment(false)}
              />
            )}

            {/* Delivery Info */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl border-2 border-amber-100 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#ff6523]" />
                Delivery Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    Secure packaging
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    Estimated delivery: {estimatedDelivery}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600">
                    Premium quality guarantee
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
