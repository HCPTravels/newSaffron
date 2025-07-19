import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import PaymentGateway from "../components/PaymentGateway";
import { 
  User, 
  Phone, 
  MapPin,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useLocation } from "react-router-dom";

const Address = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.contactNumber || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
    landmark: user?.landmark || "",
  });

  useEffect(() => {
    if (location.state?.selectedAddress) {
      setForm(location.state.selectedAddress);
    }
  }, [location.state]);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setShowLoader(true);
      setShowPayment(true);
      setIsSubmitting(false);
    }, 500);
  };

  // Remove: if (showLoader && showPayment) { ... return ... }
  // Instead, always render PaymentGateway when showPayment is true, and overlay loader if showLoader is true
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
          shippingAddress={form}
          onRazorpayReady={() => setShowLoader(false)}
        />
        {showLoader && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-[white] animate-spin" />
            <p className="mt-6 text-lg text-gray-900 font-semibold">Preparing Payment Gateway...</p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white rounded-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Shipping Information</h1>
          <p className="text-gray-500 text-lg">Please provide your details for order delivery</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#ff6523]" />
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-sm border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent focus:outline-none`}
                    required
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-sm border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent focus:outline-none`}
                    required
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#ff6523]" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-sm border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent focus:outline-none`}
                    required
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-sm border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent focus:outline-none`}
                    maxLength="10"
                    required
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#ff6523]" />
                Shipping Address
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 text-sm border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent focus:outline-none`}
                    required
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm border ${errors.city ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent focus:outline-none`}
                      required
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm border ${errors.state ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent focus:outline-none`}
                      required
                    />
                    {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm border ${errors.pincode ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent focus:outline-none`}
                      maxLength="6"
                      required
                    />
                    {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6 lg:sticky lg:top-28 h-fit">
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ₹{cartItems.reduce((total, item) => {
                      const price = parseFloat(item?.productId?.price) || 0;
                      const quantity = parseInt(item?.quantity) || 0;
                      return total + price * quantity;
                    }, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-[#ff6523]">
                    ₹{cartItems.reduce((total, item) => {
                      const price = parseFloat(item?.productId?.price) || 0;
                      const quantity = parseInt(item?.quantity) || 0;
                      return total + price * quantity;
                    }, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#ff6523] to-orange-500 text-white font-bold rounded-xl hover:from-[#e55a1d] hover:to-orange-600 transition-all flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;