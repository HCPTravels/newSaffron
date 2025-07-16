import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistSet, setWishlistSet] = useState(new Set());
  const [loadingSet, setLoadingSet] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  
  const isFetching = useRef(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchWishlist = async () => {
    if (!token || isFetching.current) return;
    
    isFetching.current = true;
    setIsLoading(true);
    
    try {
      const res = await axios.get(`${backendUrl}/api/wishlist/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data);
      setWishlistSet(new Set(res.data.map(p => p._id)));
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    } finally {
      isFetching.current = false;
      setIsLoading(false);
    }
  };

  // ✅ Enhanced toggle with product details
  const toggleWishlist = async (productId, productDetails = null) => {
    if (loadingSet.has(productId)) return;
    
    const wasInWishlist = wishlistSet.has(productId);
    
    // Store original state for rollback
    const originalWishlist = [...wishlist];
    const originalWishlistSet = new Set(wishlistSet);
    
    try {
      setLoadingSet(prev => new Set(prev).add(productId));
      
      // ✅ INSTANT UI UPDATE
      if (wasInWishlist) {
        // Remove from wishlist
        setWishlist(prev => prev.filter(item => item._id !== productId));
        setWishlistSet(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      } else {
        // Add to wishlist with product details
        setWishlistSet(prev => new Set(prev).add(productId));
        
        if (productDetails) {
          setWishlist(prev => [...prev, { _id: productId, ...productDetails }]);
        } else {
          // If no product details provided, just add the ID
          setWishlist(prev => [...prev, { _id: productId }]);
        }
      }
  
      // Make API call in background
      const response = await axios.post(
        `${backendUrl}/api/wishlist/toggle`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // ✅ Optional: Refresh from server to get complete data
      if (response.data.success && !productDetails) {
        // If we didn't have product details, fetch fresh data
        await fetchWishlist();
      }
      
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
      
      // ✅ ROLLBACK on error
      setWishlist(originalWishlist);
      setWishlistSet(originalWishlistSet);
      
      alert("Failed to update wishlist. Please try again.");
      
    } finally {
      setLoadingSet(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  // ✅ Simple check function for components
  const isInWishlist = (productId) => {
    return wishlistSet.has(productId);
  };

  // ✅ Get wishlist count
  const getWishlistCount = () => {
    return wishlist.length;
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistSet,
        loadingSet,
        isLoading,
        fetchWishlist,
        toggleWishlist,
        isInWishlist,
        getWishlistCount,
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