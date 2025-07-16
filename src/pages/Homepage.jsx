import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ Use context instead of hook
import ProductCard from "./ProductCard";

const Home = ({ onSelectProduct }) => {
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { addToCart } = useCart();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Get both token and isLoading from useAuth hook
  const { token, isLoading } = useAuth();

  // ✅ Use wishlist context instead of custom hook
  const { 
    wishlistSet, 
    loadingSet, 
    toggleWishlist, 
    isInWishlist,
    isLoading: wishlistIsLoading 
  } = useWishlist();

  // Helper function to check if user is authenticated
  const checkAuthentication = useCallback(() => {
    // Simple token-based authentication check
    const hasValidToken = !!(token && token.length > 0);
    
    console.log('🔍 Authentication check:', {
      hasValidToken,
      tokenLength: token?.length || 0
    });
    
    return hasValidToken;
  }, [token]);

  // Debug: Log auth state changes
  useEffect(() => {
    console.log('🔍 Home - Auth state changed:', {
      hasToken: !!token,
      tokenLength: token?.length,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'null',
      isAuthenticatedFinal: checkAuthentication()
    });
  }, [token, checkAuthentication]);

  // ✅ Updated debug log for wishlist context
  useEffect(() => {
    console.log('🔍 Home - Wishlist state changed:', {
      wishlistSize: wishlistSet.size,
      wishlistItems: [...wishlistSet],
      loadingItems: [...loadingSet]
    });
  }, [wishlistSet, loadingSet]);

  const fetchApprovedProducts = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsProductsLoading(true);

      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      console.log('🚀 Fetching products with headers:', headers);

      const response = await axios.get(
        `${backendUrl}/api/product/approved/product`,
        { headers, timeout: 10000 }
      );

      if (response.data) setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      if (err.code === "ECONNABORTED") {
        toast.error("Request timeout - server is taking too long to respond");
      } else if (err.response?.status === 401) {
        toast.error("Authentication required");
      } else if (err.response?.status === 403) {
        toast.error("Access denied");
      } else if (err.response?.status >= 500) {
        toast.error("Server error - please try again later");
      } else if (err.code === "ERR_NETWORK") {
        toast.error("Network error - check your connection");
      } else {
        toast.error("Failed to load products");
      }
    } finally {
      setIsProductsLoading(false);
      setHasInitialized(true);
    }
  }, [backendUrl, token, isLoading]);

  useEffect(() => {
    if (backendUrl && !hasInitialized) {
      fetchApprovedProducts();
    }
  }, [
    fetchApprovedProducts,
    backendUrl,
    hasInitialized,
  ]);

  const retryFetch = useCallback(() => {
    setHasInitialized(false);
    fetchApprovedProducts();
  }, [fetchApprovedProducts]);

  const handleAddToCart = async (product) => {
    setLoadingProductId(product._id);

    try {
      const response = await addToCart(product._id);
      // Success toast is handled in ProductCard component
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Error toast is handled in ProductCard component
      throw error; // Re-throw to let ProductCard handle it
    } finally {
      setLoadingProductId(null);
    }
  };

  // ✅ Updated wishlist handler to use context
  const handleWishlistToggle = async (product) => {
    const isUserAuthenticated = checkAuthentication();
    
    console.log('🔄 handleWishlistToggle called:', {
      productName: product.name,
      hasToken: !!token,
      isUserAuthenticated
    });

    // Check if user has valid token
    if (!isUserAuthenticated) {
      console.log('❌ No valid token in handleWishlistToggle');
      toast.error("Please log in to add items to your wishlist");
      return;
    }

    // ✅ Use context method with product details
    await toggleWishlist(product._id, product);
  };

  const LoadingState = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-100 to-[#ff6523] flex items-center justify-center shadow-lg">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-md"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Loading Premium Saffron
        </h3>
      </motion.div>
    </motion.div>
  );

  if (isProductsLoading && !hasInitialized) {
    return (
      <div className="min-h-screen relative">
        <Toaster richColors closeButton />
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Toaster richColors closeButton />

      {/* ✅ Updated debug info for context
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 right-0 bg-black text-white p-2 text-xs z-50 max-w-xs">
          <div>Token: {token ? '✅' : '❌'}</div>
          <div>Auth: {checkAuthentication() ? '✅' : '❌'}</div>
          <div>Wishlist: {wishlistSet.size} items</div>
        </div>
      )} */}

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            World's Finest <span className="text-amber-100">Saffron</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover premium saffron from Kashmir, Iran, and Spain.
          </p>
        </motion.div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isProductsLoading ? (
          <LoadingState />
        ) : products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlistToggle}
                // ✅ Updated props for context
                isInWishlist={isInWishlist(product._id)}
                isWishlistLoading={loadingSet.has(product._id)}
                loadingProductId={loadingProductId}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
           <div className="max-w-md mx-auto">
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Search className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                No products available
              </h3>

              <motion.button
                onClick={retryFetch}
                className="px-6 py-3 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retry Loading
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;