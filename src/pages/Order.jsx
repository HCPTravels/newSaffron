import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Loader2, Package, AlertCircle } from "lucide-react";
import axios from "axios";

const Order = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${backendUrl}/api/payment/getAllOrders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Order API response:", response.data);
        let orders = [];
        if (Array.isArray(response.data)) {
          orders = response.data;
        } else if (Array.isArray(response.data.orders)) {
          orders = response.data.orders;
        } else if (Array.isArray(response.data.data)) {
          orders = response.data.data;
        }
        setOrders(orders);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchOrders();
  }, [token, backendUrl]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-[#ff6523] animate-spin mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Loading your orders...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load orders</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Package className="w-10 h-10 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</div>
              <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-sm text-gray-700 mb-2">Status: <span className="font-medium text-[#ff6523]">{order.status || 'Processing'}</span></div>
            <div className="text-sm text-gray-700 mb-2">Total: <span className="font-semibold">₹{order.amount?.toFixed ? order.amount.toFixed(2) : order.amount || 'N/A'}</span></div>
            <div className="text-sm text-gray-700">Items:
              <ul className="list-disc ml-6 mt-1">
                {order.items?.map((item, idx) => (
                  <li key={idx} className="mb-2">
                    <div className="flex items-center gap-3">
                      {item.productId?.images?.[0] && (
                        <img src={item.productId.images[0]} alt={item.productId.name} className="w-12 h-12 object-cover rounded" />
                      )}
                      <div>
                        <div className="font-medium">{item.productId?.name || 'Product'} <span className="text-xs text-gray-500">({item.productId?.grade})</span></div>
                        <div className="text-xs text-gray-500">Origin: {item.productId?.origin}</div>
                        <div className="text-xs text-gray-500">Price: ₹{item.productId?.finalPrice || item.productId?.price}</div>
                        <div className="text-xs text-gray-500">Quantity: {item.quantity}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order; 