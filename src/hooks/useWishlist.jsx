import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useWishlist = (token) => {
  const [wishlist, setWishlist] = useState(new Set());
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Fetch wishlist with full product details
  const fetchWishlist = useCallback(async (showToast = false) => {
    if (!token) {
      // Clear wishlist if no token (user logged out)
      setWishlist(new Set());
      setWishlistProducts([]);
      setError(null);
      setHasInitialized(false);
      localStorage.removeItem('wishlist');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(`${backendUrl}/api/wishlist/get`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (response.data && Array.isArray(response.data)) {
        // Set full product details
        setWishlistProducts(response.data);
        
        // Extract product IDs for the Set
        const productIds = response.data.map(item => item._id || item.product?._id);
        setWishlist(new Set(productIds));
        
        // Save to localStorage
        localStorage.setItem('wishlist', JSON.stringify(productIds));
        
        if (showToast) {
          toast.success('Wishlist updated');
        }
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setError(error);
      
      if (error.code === "ECONNABORTED") {
        if (showToast) toast.error("Request timeout - server is taking too long to respond");
      } else if (error.response?.status === 401) {
        // Clear wishlist on auth error
        setWishlist(new Set());
        setWishlistProducts([]);
        localStorage.removeItem('wishlist');
        if (showToast) toast.error("Please log in to view your wishlist");
      } else if (error.response?.status === 403) {
        if (showToast) toast.error("Access denied");
      } else if (error.response?.status === 404) {
        // Wishlist not found is normal - user might not have any items
        setWishlist(new Set());
        setWishlistProducts([]);
      } else if (error.response?.status >= 500) {
        if (showToast) toast.error("Server error - please try again later");
      } else if (error.code === "ERR_NETWORK") {
        if (showToast) toast.error("Network error - check your connection");
      } else {
        // Try to load from localStorage as fallback
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          try {
            const parsed = JSON.parse(savedWishlist);
            setWishlist(new Set(parsed));
          } catch (e) {
            console.error("Failed to parse saved wishlist:", e);
          }
        }
        if (showToast) toast.error("Failed to load wishlist");
      }
    } finally {
      setIsLoading(false);
      setHasInitialized(true);
    }
  }, [token]);

  // Load wishlist when token changes
  useEffect(() => {
    if (token) {
      fetchWishlist(false);
    } else {
      // Clear data when token is removed
      setWishlist(new Set());
      setWishlistProducts([]);
      setError(null);
      setHasInitialized(false);
      localStorage.removeItem('wishlist');
    }
  }, [token, fetchWishlist]);

  // FIXED: Sync products array with wishlist Set to ensure consistency
  useEffect(() => {
    // Only sync if we have initialized to avoid clearing on initial load
    if (hasInitialized) {
      if (wishlist.size === 0) {
        console.log('Syncing: Clearing products array as wishlist is empty');
        setWishlistProducts([]);
      } else {
        // Filter out products that are no longer in the wishlist Set
        setWishlistProducts(prev => {
          const filtered = prev.filter(product => wishlist.has(product._id));
          if (filtered.length !== prev.length) {
            console.log('Syncing: Filtered products from', prev.length, 'to', filtered.length);
          }
          return filtered;
        });
      }
    }
  }, [wishlist, hasInitialized]); // Removed wishlistProducts.length from dependencies

  // Toggle wishlist item
  const toggleWishlist = async (product) => {
    if (!token) {
      toast.error("Please log in to manage your wishlist");
      return;
    }

    const productId = product._id;
    if (!productId) {
      toast.error("Invalid product");
      return;
    }

    setWishlistLoading(prev => new Set(prev).add(productId));

    try {
      const response = await axios.post(
        `${backendUrl}/api/wishlist/toggle`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.status === 'removed') {
        // Update wishlist Set first
        setWishlist(prev => {
          const updated = new Set(prev);
          updated.delete(productId);
          localStorage.setItem('wishlist', JSON.stringify([...updated]));
          return updated;
        });
        
        // Remove from products array immediately
        setWishlistProducts(prev => {
          const filtered = prev.filter(p => p._id !== productId);
          console.log('Removed from wishlist. Products before:', prev.length, 'after:', filtered.length);
          return filtered;
        });
        
        toast.success(`${product.name} removed from wishlist`);
      } else if (response.data.status === 'added') {
        // Update wishlist Set first
        setWishlist(prev => {
          const updated = new Set(prev);
          updated.add(productId);
          localStorage.setItem('wishlist', JSON.stringify([...updated]));
          return updated;
        });
        
        // Add to products array if not already there
        setWishlistProducts(prev => {
          const exists = prev.find(p => p._id === productId);
          if (!exists) {
            console.log('Added to wishlist. Products before:', prev.length, 'after:', prev.length + 1);
            return [...prev, product];
          }
          return prev;
        });
        
        toast.success(`${product.name} added to wishlist`);
      }
      
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Please log in to manage your wishlist");
        setWishlist(new Set());
        setWishlistProducts([]);
        localStorage.removeItem('wishlist');
      } else if (error.response?.status === 404) {
        toast.error("Product not found");
      } else {
        toast.error("Failed to update wishlist. Please try again.");
      }
    } finally {
      setWishlistLoading(prev => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    }
  };

  // Clear entire wishlist
  const clearWishlist = async () => {
    if (!token) {
      toast.error("Please log in to clear your wishlist");
      return;
    }

    if (wishlistProducts.length === 0) {
      toast.error("Your wishlist is already empty");
      return;
    }

    try {
      await axios.delete(`${backendUrl}/api/wishlist/clear`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setWishlist(new Set());
      setWishlistProducts([]);
      localStorage.removeItem('wishlist');
      toast.success("Wishlist cleared successfully");
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      if (error.response?.status === 401) {
        toast.error("Please log in to clear your wishlist");
      } else {
        toast.error("Failed to clear wishlist");
      }
    }
  };

  // Retry fetch function
  const retryFetch = useCallback(() => {
    setHasInitialized(false);
    fetchWishlist(true);
  }, [fetchWishlist]);

  // Debug function to check sync status
  const debugWishlistSync = useCallback(() => {
    console.log('=== Wishlist Debug Info ===');
    console.log('Wishlist Set size:', wishlist.size);
    console.log('Wishlist Set contents:', [...wishlist]);
    console.log('Products array length:', wishlistProducts.length);
    console.log('Products array IDs:', wishlistProducts.map(p => p._id));
    console.log('Products not in Set:', wishlistProducts.filter(p => !wishlist.has(p._id)).map(p => p._id));
    console.log('Set items not in Products:', [...wishlist].filter(id => !wishlistProducts.find(p => p._id === id)));
    console.log('Has initialized:', hasInitialized);
    console.log('========================');
  }, [wishlist, wishlistProducts, hasInitialized]);

  return {
    wishlist,
    wishlistProducts,
    wishlistLoading,
    isLoading,
    error,
    hasInitialized,
    toggleWishlist,
    clearWishlist,
    retryFetch,
    refetch: fetchWishlist,
    debugWishlistSync,
  };
};

export default useWishlist;