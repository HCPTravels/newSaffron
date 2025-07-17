import React, { useState, useEffect } from "react";
import {
  Package,
  CheckCircle,
  Truck,
  RefreshCw,
  XCircle,
  Filter,
  Search,
  Download,
  Printer,
  ChevronDown,
  Star,
  Zap,
  CreditCard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const { token } = useAuth();

  // Mock data - replace with your actual API call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call with mock data
        const mockOrders = [
          {
            _id: "order123",
            orderNumber: "SAF-2023-1234",
            createdAt: "2023-11-15T10:30:00Z",
            status: "completed",
            subtotal: 4000,
            shippingFee: 150,
            discount: 200,
            total: 3950,
            items: [
              {
                _id: "item123",
                product: {
                  _id: "prod123",
                  name: "Premium Kashmiri Saffron",
                  origin: "Kashmir",
                  grade: "premium",
                  price: 500,
                },
                quantity: 2,
                price: 500,
              },
              {
                _id: "item124",
                product: {
                  _id: "prod124",
                  name: "Royal Spanish Saffron",
                  origin: "Spain",
                  grade: "premium",
                  price: 600,
                },
                quantity: 1,
                price: 600,
              },
            ],
            shipping: {
              name: "John Doe",
              address: {
                line1: "123 Spice Lane",
                line2: "Apt 4B",
                city: "Mumbai",
                state: "Maharashtra",
                postal_code: "400001",
                country: "India",
              },
              phone: "+911234567890",
              carrier: "FedEx",
            },
            payment: {
              method: "credit_card",
              status: "succeeded",
            },
          },
        ];
        setOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Filter orders based on status and search query
  const filteredOrders = orders
    .filter((order) => {
      if (filter === "all") return true;
      return order.status === filter;
    })
    .filter((order) =>
      order.items.some((item) =>
        item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statuses = {
      completed: {
        icon: <CheckCircle className="w-4 h-4" />,
        className: "bg-green-100 text-green-800",
      },
      processing: {
        icon: <RefreshCw className="w-4 h-4 animate-spin" />,
        className: "bg-blue-100 text-blue-800",
      },
      shipped: {
        icon: <Truck className="w-4 h-4" />,
        className: "bg-amber-100 text-amber-800",
      },
      cancelled: {
        icon: <XCircle className="w-4 h-4" />,
        className: "bg-red-100 text-red-800",
      },
    };
    return statuses[status] || statuses.processing;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pt-20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 bg-gradient-to-r from-amber-100 to-[#ff6523] rounded-full flex items-center justify-center"
        >
          <Package className="w-10 h-10 text-white" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pt-20 pb-32 px-4 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Saffron Orders
        </h1>
        <p className="text-lg text-gray-600">
          Track your precious saffron shipments
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white border-2 border-amber-200 rounded-lg appearance-none focus:outline-none focus:border-[#ff6523]"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border-2 border-amber-200 rounded-lg focus:outline-none focus:border-[#ff6523] w-full md:w-64"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border-2 border-amber-200 rounded-lg flex items-center gap-2 hover:bg-amber-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-white border-2 border-amber-200 rounded-lg flex items-center gap-2 hover:bg-amber-50 transition-colors">
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </motion.div>

      {/* Orders List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto space-y-4"
      >
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-8 text-center"
          >
            <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500">
              {filter === "all"
                ? "You haven't placed any orders yet"
                : `No ${filter} orders found`}
            </p>
          </motion.div>
        ) : (
          filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden"
            >
              {/* Order Header */}
              <div
                className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-amber-50 transition-colors"
                onClick={() =>
                  setExpandedOrder(
                    expandedOrder === order._id ? null : order._id
                  )
                }
              >
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-[#ff6523]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Order #{order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-gray-900">₹{order.total}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        getStatusBadge(order.status).className
                      }`}
                    >
                      {getStatusBadge(order.status).icon}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedOrder === order._id ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Order Details */}
              <AnimatePresence>
                {expandedOrder === order._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-amber-200 p-6">
                      {/* Order Items */}
                      <div className="mb-8">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-amber-500" />
                          Saffron Items
                        </h4>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item._id}
                              className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg"
                            >
                              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center">
                                <span className="text-xl font-bold text-amber-600">
                                  {item.product.name.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-bold text-gray-900">
                                  {item.product.name}
                                </h5>
                                <p className="text-sm text-gray-500">
                                  {item.product.origin} • {item.quantity}g • ₹
                                  {item.price}/g
                                </p>
                                {item.product.grade === "premium" && (
                                  <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-500 to-[#ff6523] text-white">
                                    <Star className="w-3 h-3 mr-1" />
                                    Premium Grade
                                  </span>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-900">
                                  ₹{item.price * item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Truck className="w-5 h-5 text-blue-500" />
                            Shipping Details
                          </h4>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-900">
                              {order.shipping.name}
                            </p>
                            <p className="text-gray-600">
                              {order.shipping.address.line1}
                            </p>
                            {order.shipping.address.line2 && (
                              <p className="text-gray-600">
                                {order.shipping.address.line2}
                              </p>
                            )}
                            <p className="text-gray-600">
                              {order.shipping.address.city},{" "}
                              {order.shipping.address.state} -{" "}
                              {order.shipping.address.postal_code}
                            </p>
                            <p className="text-gray-600">
                              {order.shipping.address.country}
                            </p>
                            <p className="mt-2 text-gray-600">
                              Phone: {order.shipping.phone}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-green-500" />
                            Payment & Summary
                          </h4>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Subtotal:</span>
                              <span className="font-medium">
                                ₹{order.subtotal}
                              </span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Shipping:</span>
                              <span className="font-medium">
                                {order.shippingFee === 0
                                  ? "Free"
                                  : `₹${order.shippingFee}`}
                              </span>
                            </div>
                            {order.discount > 0 && (
                              <div className="flex justify-between mb-2 text-green-600">
                                <span>Discount:</span>
                                <span className="font-medium">
                                  -₹{order.discount}
                                </span>
                              </div>
                            )}
                            <div className="border-t border-green-200 pt-2 mt-2">
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-900">
                                  Total:
                                </span>
                                <span className="font-bold text-[#ff6523]">
                                  ₹{order.total}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 pt-2 border-t border-green-200">
                              <p className="text-sm text-gray-600">
                                Paid with {order.payment.method} •{" "}
                                {order.payment.status === "succeeded"
                                  ? "Success"
                                  : "Pending"}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                Order will be shipped via{" "}
                                {order.shipping.carrier}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="mt-8 flex flex-wrap gap-3">
                        {order.status === "processing" && (
                          <button className="px-6 py-2 bg-red-100 border-2 border-red-200 text-red-800 rounded-lg font-medium hover:bg-red-200 transition-colors">
                            Cancel Order
                          </button>
                        )}
                        {order.status === "shipped" && (
                          <button className="px-6 py-2 bg-blue-100 border-2 border-blue-200 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                            Track Shipment
                          </button>
                        )}
                        <button className="px-6 py-2 bg-amber-100 border-2 border-amber-200 text-amber-800 rounded-lg font-medium hover:bg-amber-200 transition-colors">
                          Download Invoice
                        </button>
                        {order.status === "completed" && (
                          <button className="px-6 py-2 bg-green-100 border-2 border-green-200 text-green-800 rounded-lg font-medium hover:bg-green-200 transition-colors">
                            Buy Again
                          </button>
                        )}
                        <button className="px-6 py-2 bg-white border-2 border-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors ml-auto">
                          Need Help?
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Orders;
