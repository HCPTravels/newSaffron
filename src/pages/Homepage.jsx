import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  Zap,
  Loader2,
  ImagePlus,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Home = ({ onSelectProduct }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [hasInitialized, setHasInitialized] = useState(false);
  const { addToCart } = useCart();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token, isAuthLoading, isAuthenticated } = useAuth();

  const fetchApprovedProducts = useCallback(async () => {
    if (isAuthLoading) return;

    try {
      setIsLoading(true);

      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;

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
      setIsLoading(false);
      setHasInitialized(true);
    }
  }, [backendUrl, token, isAuthLoading, isAuthenticated]);

  useEffect(() => {
    if (!isAuthLoading && backendUrl && (!hasInitialized || isAuthenticated)) {
      fetchApprovedProducts();
    }
  }, [
    fetchApprovedProducts,
    isAuthLoading,
    isAuthenticated,
    backendUrl,
    hasInitialized,
  ]);

  const retryFetch = useCallback(() => {
    setHasInitialized(false);
    fetchApprovedProducts();
  }, [fetchApprovedProducts]);

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  const handleAddToCart = async (product) => {
    setLoadingProductId(product._id);

    try {
      const response = await addToCart(product._id);

      toast.success(`${product.name} has been added to your cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setLoadingProductId(null);
    }
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
          {isAuthLoading ? "Authenticating..." : "Loading Premium Saffron"}
        </h3>
      </motion.div>
    </motion.div>
  );

  if (isAuthLoading && !hasInitialized) {
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
        {isLoading ? (
          <LoadingState />
        ) : products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                onClick={() => onSelectProduct(product._id)}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 cursor-pointer"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Container */}
                <div className="h-48 relative bg-gray-100 flex items-center justify-center">
                  {product.images?.length > 0 && !imageErrors[product._id] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                      onError={() => handleImageError(product._id)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <ImagePlus className="h-12 w-12" />
                    </div>
                  )}

                  {/* Grade Badge */}
                  {product.grade && (
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          product.grade === "premium"
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.grade === "premium" && "Premium"}
                        {product.grade === "category1" && "Category I"}
                        {product.grade === "category2" && "Category II"}
                        {product.grade === "category3" && "Category III"}
                        {product.grade === "bunch" && "Bunch"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {product.name}
                    </h3>
                    {product.stock && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {product.stock}g
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">
                      {product.origin}
                    </span>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#ff6523]">
                        ₹{parseFloat(product.price).toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        per gram
                      </span>
                    </div>
                    <motion.button
                      className="px-3 py-1.5 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white text-xs font-medium rounded-lg hover:shadow-md transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={loadingProductId === product._id}
                    >
                      {loadingProductId === product._id ? (
                        <div className="flex items-center gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Adding...</span>
                        </div>
                      ) : (
                        "Add to Cart"
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
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
