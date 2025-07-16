import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistSet, setWishlistSet] = useState(new Set());
  const [loadingSet, setLoadingSet] = useState(new Set());

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchWishlist = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendUrl}/api/wishlist/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data);
      setWishlistSet(new Set(res.data.map(p => p._id)));
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      setLoadingSet(prev => new Set(prev).add(productId));
  
      await axios.post(
        `${backendUrl}/api/wishlist/toggle`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // ✅ Re-fetch the updated wishlist
      await fetchWishlist();
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
    } finally {
      setLoadingSet(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token,wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistSet,
        loadingSet,
        fetchWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};