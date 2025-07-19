import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserAddresses = () => {
  const { token } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchAddresses = async () => {
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
  }, [token]);

  return (
    <div className="min-h-screen pt-20 bg-white rounded-xl">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Addresses</h1>
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          {loading ? (
            <p className="text-gray-500 text-lg">Loading...</p>
          ) : addresses.length === 0 ? (
            <p className="text-gray-600 text-lg">You have not added any addresses yet.</p>
          ) : (
            <div className="grid gap-6">
              {addresses.map((address, index) => (
                <div key={index} className="bg-gray-50 rounded-xl shadow p-6 text-left border border-gray-200">
                  <div className="font-semibold text-lg text-[#ff6523] mb-1">
                    {address.firstName} {address.lastName}
                  </div>
                  <div className="text-gray-700 mb-1">{address.address}, {address.city}, {address.state}, {address.pincode}</div>
                  <div className="text-gray-600 text-sm mb-1">{address.email} | {address.phone}</div>
                  {address.landmark && <div className="text-gray-400 text-xs">Landmark: {address.landmark}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAddresses;
