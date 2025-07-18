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
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";

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
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
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
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-white rounded-3xl">
        <LoadingState />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen pt-20 bg-white rounded-3xl">
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
      <div className="min-h-screen pt-20 bg-white rounded-3xl">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white rounded-xl">
      <Toaster richColors closeButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Your Shopping Cart</h1>
            <img src={SaffronIcon} alt="Saffron" className="w-10 h-10" />
          </div>
          <p className="text-gray-500 text-lg">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-8">
            {cartItems.map((item, idx) => {
              const product = item?.productId;
              if (!product) return null;
              const gradeBadge = getGradeBadge(product.grade);
              const itemPrice = parseFloat(product.price) || 0;
              const itemQuantity = parseInt(item.quantity) || 0;
              return (
                <div key={product._id} className="bg-white rounded-3xl shadow-md p-6 flex flex-col sm:flex-row gap-6 items-center border border-gray-100">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-40 sm:h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="flex-1 w-full flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${gradeBadge.className}`}>{gradeBadge.text}</span>
                          {product.crocin && (
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{product.crocin} Crocin</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Origin: {product.origin}</span>
                          {product.rating && (
                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-current" />{product.rating}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-xl font-bold text-[#ff6523] sm:text-right">
                        ₹{itemPrice.toFixed(2)}
                        <span className="text-xs text-gray-400 font-normal ml-1">/g</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition disabled:opacity-50"
                          onClick={() => updateQuantity(product._id, itemQuantity - 1)}
                          disabled={itemQuantity <= 1 || updatingItem === product._id}
                        >
                          {updatingItem === product._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Minus className="w-4 h-4 text-gray-600" />}
                        </button>
                        <span className="w-12 h-9 bg-white border border-gray-200 rounded flex items-center justify-center font-semibold text-gray-900 text-lg">
                          {itemQuantity}
                        </span>
                        <button
                          className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition disabled:opacity-50"
                          onClick={() => updateQuantity(product._id, itemQuantity + 1)}
                          disabled={updatingItem === product._id}
                        >
                          {updatingItem === product._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 text-gray-600" />}
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-gray-900">₹{(itemPrice * itemQuantity).toFixed(2)}</span>
                        <button
                          className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-red-50 transition disabled:opacity-50"
                          onClick={() => removeFromCart(product._id)}
                          disabled={removingItem === product._id}
                        >
                          {removingItem === product._id ? <Loader2 className="w-4 h-4 animate-spin text-gray-500" /> : <Trash2 className="w-4 h-4 text-gray-500 hover:text-[#ff6523]" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Section */}
          <div className="space-y-6 lg:sticky lg:top-28 h-fit">
            {/* Promo Code */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
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
                  className="flex-1 px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#ff6523] transition-colors"
                  disabled={promoApplied}
                />
                <button
                  className="px-3 py-2 bg-[#ff6523] text-white font-medium rounded-lg hover:bg-[#e55a1d] transition-colors disabled:opacity-50"
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
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
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
                className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
                onClick={() => setShowPayment(true)}
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {showPayment && (
              <PaymentGateway
                totalPrice={total}
                onClose={() => setShowPayment(false)}
              />
            )}

            {/* Delivery Info */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
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