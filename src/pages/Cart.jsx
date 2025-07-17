import React from "react";
import { useEffect } from "react";
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
import { Toaster } from "sonner";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useLocation, Navigate } from "react-router-dom";
import PaymentGateway from "../components/PaymentGateway";

const Cart = () => {
  const location = useLocation();
  // Redirect if accessed directly via /cart
  if (location.pathname === "/cart") {
    return <Navigate to="/profile/cart" replace />;
  }

  const {
    cartItems,
    isLoading,
    updatingItem,
    removingItem,
    promoCode,
    promoApplied,
    discount,
    estimatedDelivery,
    showPayment,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
    setShowPayment,
    setPromoCode,
    fetchCartItems,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  useEffect(() => {
    fetchCartItems(); // Safe and idempotent, only triggers if needed
  }, [location.pathname]);

  const { token } = useAuth();

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item?.productId?.price) || 0;
    const quantity = parseInt(item?.quantity) || 0;
    return total + price * quantity;
  }, 0);

  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal - discountAmount + shipping;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "saffron10") {
      applyPromoCode("saffron10");
    } else if (promoCode.toLowerCase() === "premium20") {
      applyPromoCode("premium20");
    } else {
      applyPromoCode(promoCode);
    }
  };

  const getGradeBadge = (grade) => {
    const badges = {
      premium: {
        className: "bg-[#ff6523] text-white",
        icon: <Zap className="w-3 h-3 mr-1" />,
        text: "Premium",
      },
      category1: {
        className: "bg-[#ff6523] text-white",
        text: "Category I",
      },
      category2: {
        className: "bg-[#ff6523]/80 text-white",
        text: "Category II",
      },
      category3: {
        className: "bg-[#ff6523]/60 text-white",
        text: "Category III",
      },
      default: {
        className: "bg-gray-200 text-gray-800",
        text: "Standard",
      },
    };

    return badges[grade] || badges.default;
  };

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-[#ff6523] flex items-center justify-center">
          <ShoppingCart className="w-10 h-10 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Loading your cart...
      </h3>
    </div>
  );

  const EmptyCart = () => (
    <div className="text-center py-20">
      <div className="w-24 h-24 bg-[#ff6523] rounded-full flex items-center justify-center mx-auto mb-8">
        <ShoppingCart className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Your cart is empty
      </h2>
      <button
        className="px-8 py-3 bg-[#ff6523] text-white font-semibold rounded-lg"
        onClick={() => (window.location.href = "/profile")}
      >
        Start Shopping
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <LoadingState />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-md mx-auto text-center py-20">
          <AlertCircle className="w-16 h-16 text-[#ff6523] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Sign In
          </h2>
          <button className="px-8 py-3 bg-[#ff6523] text-white font-semibold rounded-lg">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <Toaster richColors closeButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Your Saffron Collection
          </h1>
          <p className="text-gray-600">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#ff6523]" />
                  Cart Items
                </h2>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => {
                    const product = item?.productId;
                    if (!product) return null;

                    const gradeBadge = getGradeBadge(product.grade);
                    const itemPrice = parseFloat(product.price) || 0;
                    const itemQuantity = parseInt(item.quantity) || 0;

                    return (
                      <motion.div
                        key={product._id}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                      >
                        {/* Product Image - Fixed aspect ratio and proper scaling */}
                        <div className="w-full sm:w-20 h-48 sm:h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full font-medium ${gradeBadge.className}`}
                                >
                                  {gradeBadge.text}
                                </span>
                                {product.crocin && (
                                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                    {product.crocin} Crocin
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-[#ff6523] sm:text-right">
                              ₹{itemPrice.toFixed(2)}
                              <span className="text-xs text-gray-500 font-normal ml-1">
                                /g
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>Origin: {product.origin}</span>
                              {product.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span>{product.rating}</span>
                                </div>
                              )}
                            </div>

                            {/* Quantity Controls - Mobile */}
                            <div className="sm:hidden flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <button
                                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                                  onClick={() =>
                                    updateQuantity(
                                      product._id,
                                      itemQuantity - 1
                                    )
                                  }
                                  disabled={
                                    itemQuantity <= 1 ||
                                    updatingItem === product._id
                                  }
                                >
                                  {updatingItem === product._id ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Minus className="w-3 h-3 text-gray-600" />
                                  )}
                                </button>

                                <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center font-medium text-gray-900">
                                  {itemQuantity}
                                </div>

                                <button
                                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                                  onClick={() =>
                                    updateQuantity(
                                      product._id,
                                      itemQuantity + 1
                                    )
                                  }
                                  disabled={updatingItem === product._id}
                                >
                                  {updatingItem === product._id ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Plus className="w-3 h-3 text-gray-600" />
                                  )}
                                </button>
                              </div>

                              <div className="text-base font-bold text-gray-900">
                                ₹{(itemPrice * itemQuantity).toFixed(2)}
                              </div>
                            </div>

                            {/* Quantity Controls - Desktop */}
                            <div className="hidden sm:flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <button
                                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                                  onClick={() =>
                                    updateQuantity(
                                      product._id,
                                      itemQuantity - 1
                                    )
                                  }
                                  disabled={
                                    itemQuantity <= 1 ||
                                    updatingItem === product._id
                                  }
                                >
                                  {updatingItem === product._id ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Minus className="w-3 h-3 text-gray-600" />
                                  )}
                                </button>

                                <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center font-medium text-gray-900">
                                  {itemQuantity}
                                </div>

                                <button
                                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                                  onClick={() =>
                                    updateQuantity(
                                      product._id,
                                      itemQuantity + 1
                                    )
                                  }
                                  disabled={updatingItem === product._id}
                                >
                                  {updatingItem === product._id ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Plus className="w-3 h-3 text-gray-600" />
                                  )}
                                </button>
                              </div>

                              <div className="text-base font-bold text-gray-900 min-w-[80px] text-right">
                                ₹{(itemPrice * itemQuantity).toFixed(2)}
                              </div>

                              <button
                                className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                                onClick={() => removeFromCart(product._id)}
                                disabled={removingItem === product._id}
                              >
                                {removingItem === product._id ? (
                                  <Loader2 className="w-3 h-3 animate-spin text-gray-500" />
                                ) : (
                                  <Trash2 className="w-3 h-3 text-gray-500 hover:text-[#ff6523]" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button - Mobile */}
                        <button
                          className="sm:hidden w-full py-2 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-50"
                          onClick={() => removeFromCart(product._id)}
                          disabled={removingItem === product._id}
                        >
                          {removingItem === product._id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4 text-gray-500 hover:text-[#ff6523]" />
                              <span>Remove</span>
                            </>
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-4">
            {/* Promo Code */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#ff6523]" />
                Promo Code
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ff6523] transition-colors"
                  disabled={promoApplied}
                />
                <button
                  className="px-3 py-2 bg-[#ff6523] text-white font-medium rounded hover:bg-[#e55a1d] transition-colors disabled:opacity-50"
                  onClick={handleApplyPromo}
                  disabled={promoApplied || !promoCode}
                >
                  {promoApplied ? <CheckCircle className="w-4 h-4" /> : "Apply"}
                </button>
              </div>
              {promoApplied && (
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>{discount}% discount applied</span>
                  <button
                    className="ml-auto text-sm text-[#ff6523] hover:underline"
                    onClick={removePromoCode}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#ff6523]" />
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">
                      -₹{discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span className="text-[#ff6523]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-4 py-3 bg-[#ff6523] text-white font-bold rounded-lg hover:bg-[#e55a1d] transition-colors flex items-center justify-center gap-2"
                onClick={() => setShowPayment(true)}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {showPayment && (
              <PaymentGateway
                totalPrice={total}
                onClose={() => setShowPayment(false)}
              />
            )}

            {/* Delivery Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ff6523]" />
                Delivery Information
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#ff6523]" />
                  <span>Secure packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#ff6523]" />
                  <span>Estimated delivery: {estimatedDelivery}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
