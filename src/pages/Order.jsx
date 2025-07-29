import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Loader2, Package, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";

const Order = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${backendUrl}/api/payment/getAllOrders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        let orders = [];
        if (Array.isArray(response.data)) {
          orders = response.data;
        } else if (Array.isArray(response.data.orders)) {
          orders = response.data.orders;
        } else if (Array.isArray(response.data.data)) {
          orders = response.data.data;
        }
        
        setOrders(orders);
        toast.success("Orders loaded successfully");
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || "Failed to fetch orders";
        setError(errorMsg);
        toast.error("Error loading orders", {
          description: errorMsg,
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (token) fetchOrders();
  }, [token, backendUrl]);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIndicator = (status) => {
    let statusClass = "";
    switch (status?.toLowerCase()) {
      case 'delivered':
        statusClass = "bg-green-500";
        break;
      case 'shipped':
        statusClass = "bg-blue-500";
        break;
      default:
        statusClass = "bg-orange-500";
    }
    
    return (
      <div className="flex items-center">
        <span className={`w-2 h-2 rounded-full mr-2 ${statusClass}`}></span>
        <span className="capitalize">{status || 'Processing'}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white rounded-3xl flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#ff6523] animate-spin mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Loading your orders...</h3>
        <p className="text-gray-600">Please wait while we fetch your order history</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 bg-white rounded-3xl flex flex-col items-center justify-center">
        <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load orders</h3>
        <p className="text-gray-600 max-w-md text-center">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#ff6523] text-white rounded-lg hover:bg-[#e55a1d] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="bg-white rounded-3xl shadow-sm p-10 max-w-md w-full text-center border border-gray-100">
          <Package className="w-10 h-10 text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <button 
            onClick={() => window.location.href = "/dashboard"}
            className="px-4 py-2 bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white rounded-lg hover:shadow-md transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full px-4 sm:px-8 mt-0 sm:mt-4 mb-2 sm:mb-4 flex flex-col items-center text-center flex-shrink-0">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">My Orders</h1>
          <img src={SaffronIcon} alt="Saffron" className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <p className="text-gray-500 text-base sm:text-lg">Your order history and details</p>
      </div>
      {/* Scrollable Orders List */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-HEADER_HEIGHT)]">
        {/* Orders card container */}
        <div className="w-full max-w-md sm:max-w-5xl mx-auto py-3 sm:py-12 px-0 sm:px-8">
          <div className="bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 p-0 sm:p-0">
            <div className="space-y-8">
              {orders.map((order) => {
                const orderImage = order.items?.[0]?.productId?.images?.[0];
                return (
                  <motion.div 
                    key={order._id}
                    className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ boxShadow: "0 4px 12px rgba(254, 101, 34, 0.1)" }}
                  >
                    <button 
                      className="w-full p-6 flex justify-between items-center text-left"
                      onClick={() => toggleOrder(order._id)}
                    >
                      <div className="flex items-center space-x-4 justify-start">
                        <div className="bg-gray-100 p-1 rounded-xl flex-shrink-0">
                          {orderImage ? (
                            <img 
                              src={orderImage} 
                              alt="Order" 
                              className="h-14 w-14 object-cover rounded-xl"
                            />
                          ) : (
                            <div className="h-14 w-14 bg-gray-200 rounded-xl flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 text-lg">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {getStatusIndicator(order.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 sm:space-x-8">
                        <div className="text-right hidden sm:block">
                          <div className="text-sm text-gray-500">Order Date</div>
                          <div className="text-base font-medium">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-center min-w-0 flex-shrink-0">
                          <div className="text-sm text-gray-500">Total</div>
                          <div className="text-lg sm:text-xl font-bold text-[#ff6523] mt-1">
                            ₹{order.amount?.toFixed ? order.amount.toFixed(2) : order.amount || 'N/A'}
                          </div>
                        </div>
                        {expandedOrder === order._id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                    {expandedOrder === order._id && (
                      <motion.div 
                        className="border-t border-gray-100 px-6 py-6 bg-gray-50"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Items ({order.items?.length || 0})</h4>
                            <div className="space-y-6">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-8">
                                  <div className="flex-shrink-0">
                                    {item.productId?.images?.[0] ? (
                                      <img 
                                        src={item.productId.images[0]} 
                                        alt={item.productId.name} 
                                        className="w-24 h-24 object-cover rounded-2xl border-2 border-gray-200 shadow-sm"
                                      />
                                    ) : (
                                      <div className="w-24 h-24 bg-gray-100 rounded-2xl border-2 border-gray-200 flex items-center justify-center shadow-sm">
                                        <Package className="h-10 w-10 text-gray-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 text-right">
                                    <div className="font-semibold text-gray-900 text-base text-left">
                                      {item.productId?.name || 'Product'}
                                      <span className="text-sm text-gray-500 ml-2 font-normal">({item.productId?.grade})</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1 text-left">
                                      Origin: {item.productId?.origin}
                                    </div>
                                    <div className="flex justify-between mt-3 text-sm">
                                      <span className="text-gray-700 font-medium">
                                        ₹{item.productId?.finalPrice || item.productId?.price} × {item.quantity}
                                      </span>
                                      <span className="font-semibold text-[#ff6523]">
                                        ₹{((item.productId?.finalPrice || item.productId?.price) * item.quantity).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Order Details Section */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Order ID:</span>
                                  <span className="font-medium">{order._id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Date:</span>
                                  <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Status:</span>
                                  <span className="font-medium capitalize">{getStatusIndicator(order.status)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Payment Method:</span>
                                  <span className="font-medium capitalize">{order.paymentMethod || 'Online'}</span>
                                </div>
                              </div>
                            </div>
                            {/* Order Summary Section */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                              <div className="text-right space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500 mr-4">Subtotal:</span>
                                  <span className="font-medium">
                                    ₹{order.items?.reduce((sum, item) => {
                                      const price = item.productId?.finalPrice || item.productId?.price || 0;
                                      return sum + (price * item.quantity);
                                    }, 0)?.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500 mr-4">Shipping:</span>
                                  <span className="font-medium">₹0.00</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between text-base font-bold text-[#ff6523]">
                                  <span className="mr-0 sm:mr-4 text-left sm:text-right">Total:</span>
                                  <span className="text-right mt-1 sm:mt-0">₹{order.amount?.toFixed ? order.amount.toFixed(2) : order.amount || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;