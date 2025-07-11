import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, ChevronDown, Star, Zap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Home = ({ onSelectProduct }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [hasInitialized, setHasInitialized] = useState(false);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token, isAuthLoading, isAuthenticated } = useAuth(); // Add isAuthLoading and isAuthenticated from your auth context

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchApprovedProducts = useCallback(async () => {
    // Don't fetch if we're still loading auth state
    if (isAuthLoading) {
      console.log("Auth still loading, skipping product fetch");
      return;
    }

    try {
      setIsLoading(true);
      
      console.log("=== Fetching Approved Products ===");
      console.log("Backend URL:", backendUrl);
      console.log("Token exists:", !!token);
      console.log("Is Authenticated:", isAuthenticated);
      console.log("Token preview:", token?.substring(0, 20) + "...");
      
      // Create headers object - include auth if available
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      console.log("Request headers:", headers);
      
      const response = await axios.get(
        `${backendUrl}/api/product/approved/product`,
        { 
          headers,
          timeout: 10000 // 10 second timeout
        }
      );
      
      console.log("Products fetch successful:", response.data?.length || 0, "products");
      
      if (response.data) {
        setProducts(response.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      
      // Better error handling
      if (err.code === 'ECONNABORTED') {
        toast.error("Request timeout - server is taking too long to respond");
      } else if (err.response?.status === 401) {
        toast.error("Authentication required");
      } else if (err.response?.status === 403) {
        toast.error("Access denied");
      } else if (err.response?.status >= 500) {
        toast.error("Server error - please try again later");
      } else if (err.code === 'ERR_NETWORK') {
        toast.error("Network error - check your connection");
      } else {
        toast.error("Failed to load products");
      }
    } finally {
      setIsLoading(false);
      setHasInitialized(true);
    }
  }, [backendUrl, token, isAuthLoading, isAuthenticated]);

  // Effect to handle initial load and auth state changes
  useEffect(() => {
    console.log("=== Auth State Changed ===");
    console.log("Auth Loading:", isAuthLoading);
    console.log("Is Authenticated:", isAuthenticated);
    console.log("Token exists:", !!token);
    
    // Only fetch products when:
    // 1. Auth is not loading anymore
    // 2. We have a backend URL
    // 3. We haven't initialized yet OR auth state changed
    if (!isAuthLoading && backendUrl && (!hasInitialized || isAuthenticated)) {
      fetchApprovedProducts();
    }
  }, [fetchApprovedProducts, isAuthLoading, isAuthenticated, backendUrl, hasInitialized]);

  // Retry mechanism for failed requests
  const retryFetch = useCallback(() => {
    console.log("Retrying product fetch...");
    setHasInitialized(false);
    fetchApprovedProducts();
  }, [fetchApprovedProducts]);

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const handleAddToCart = async (product) => {
    if (!token) {
      toast.error("Authentication Required", {
        description: "Please login to add items to your cart.",
        duration: 3000,
        position: "top-center",
        style: {
          background: "#dc2626",
          border: "1px solid #dc2626",
          color: "white",
        },
      });
      return;
    }

    setLoadingProductId(product._id);

    try {
      const cartData = {
        productId: product._id,
        quantity: 1,
      };

      console.log("=== Adding to Cart ===");
      console.log("Product ID:", product._id);
      console.log("Cart data:", cartData);

      // Try different possible cart endpoints
      const possibleEndpoints = [
        "/api/cart/add",
        "/api/cart",
        "/api/carts/add",
        "/api/user/cart/add",
      ];

      let success = false;
      let lastError = null;

      for (const endpoint of possibleEndpoints) {
        try {
          console.log(`Trying endpoint: ${backendUrl}${endpoint}`);

          const response = await axios.post(
            `${backendUrl}${endpoint}`,
            cartData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              timeout: 10000,
            }
          );

          console.log(`Success with endpoint ${endpoint}:`, response.data);
          success = true;
          break;
        } catch (error) {
          console.log(
            `Failed with endpoint ${endpoint}:`,
            error.response?.status || error.code
          );
          lastError = error;

          if (error.response?.status === 404) {
            continue;
          }

          if (error.response?.status !== 404) {
            throw error;
          }
        }
      }

      if (!success) {
        throw lastError || new Error("All cart endpoints failed");
      }

      toast.success("Added to cart", {
        description: `${product.name} has been added to your cart.`,
        duration: 3000,
        position: "top-center",
        style: {
          background: "#16a34a",
          border: "1px solid #16a34a",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);

      let errorMessage = "Failed to add item to cart";
      let errorDetails = "";

      if (error.code === "ECONNABORTED") {
        errorMessage = "Server is taking too long to respond";
        errorDetails = "Please try again or check your connection";
      } else if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
        errorMessage = "Cannot connect to server";
        errorDetails = "Please make sure your backend server is running";
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication failed";
        errorDetails = "Please login again";
      } else if (error.response?.status === 404) {
        errorMessage = "Cart API not found";
        errorDetails = "Please check if the cart API endpoint exists";
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Invalid request";
        errorDetails = "Please check the request data format";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error";
        errorDetails = "Please try again later";
      }

      toast.error(errorMessage, {
        description: errorDetails,
        duration: 5000,
        position: "top-center",
        style: {
          background: "#dc2626",
          border: "1px solid #dc2626",
          color: "white",
        },
      });
    } finally {
      setLoadingProductId(null);
    }
  };

  // Enhanced loading state that shows different messages based on auth state
  const LoadingState = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-100 to-[#ff6523] flex items-center justify-center shadow-lg">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
        <div className="absolute -inset-4 border-4 border-amber-200/30 rounded-full animate-ping"></div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-md"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {isAuthLoading ? "Authenticating..." : "Harvesting the Finest Saffron"}
        </h3>
        <p className="text-gray-600 mb-6">
          {isAuthLoading 
            ? "Please wait while we verify your authentication..." 
            : "We're carefully gathering the world's most precious saffron threads for you. Each strand is being hand-selected for quality."}
        </p>
        <div className="flex justify-center gap-2">
          {["Kashmir", "Iran", "Spain"].map((origin) => (
            <motion.span
              key={origin}
              className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              {origin}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  // Show loading while auth is being initialized
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

      {/* Enhanced Hero Section */}
      <div className="relative pt-24 pb-16 px-4 overflow-hidden z-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full mix-blend-overlay blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-xl"></div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            World's Finest <span className="text-amber-100">Saffron</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover premium saffron from Kashmir, Iran, and Spain. Each thread
            carefully selected for exceptional quality and flavor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
          >
            <Star className="w-5 h-5 text-amber-200 fill-current" />
            <span className="text-amber-100 font-medium">
              Trusted by chefs worldwide
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-30">
        {isLoading ? (
          <LoadingState />
        ) : products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                onClick={() => {
                  onSelectProduct(product._id);
                }}
                className="group bg-white border-2 border-black rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer relative z-40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
                  {/* Product Image */}
                  {product.images && product.images.length > 0 && !imageErrors[product._id] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(product._id)}
                      loading="lazy"
                    />
                  ) : (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0.1 }}
                      whileHover={{ opacity: 0.15 }}
                    >
                      <div className="text-7xl font-black text-amber-400/20 transition-colors duration-300">
                        {product.origin?.charAt(0) || "S"}
                      </div>
                    </motion.div>
                  )}

                  {/* Grade Badge */}
                  <div className="absolute top-4 right-4">
                    <motion.span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        product.grade === "premium"
                          ? "bg-gradient-to-r from-amber-500 to-[#ff6523] text-white shadow-md"
                          : product.grade === "category1"
                          ? "bg-gradient-to-r from-[#ff6523] to-orange-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {product.grade === "premium" && (
                        <Zap className="w-3 h-3 mr-1" />
                      )}
                      {product.grade === "premium" && "Premium"}
                      {product.grade === "category1" && "Category I"}
                      {product.grade === "category2" && "Category II"}
                      {product.grade === "category3" && "Category III"}
                      {product.grade === "bunch" && "Bunch"}
                    </motion.span>
                  </div>

                  {/* Rating Badge */}
                  {product.rating && (
                    <motion.div
                      className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-800 font-semibold">
                        {product.rating}
                      </span>
                    </motion.div>
                  )}

                  {/* Image overlay */}
                  {product.images && product.images.length > 0 && !imageErrors[product._id] && (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#ff6523] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 font-medium">
                        {product.origin}
                      </span>
                      {product.crocin && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                          {product.crocin} Crocin
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                      <div className="text-sm text-gray-500">per gram</div>
                    </div>
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg relative z-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      whileHover={{
                        scale: loadingProductId === product._id ? 1 : 1.05,
                      }}
                      whileTap={{
                        scale: loadingProductId === product._id ? 1 : 0.95,
                      }}
                      disabled={loadingProductId === product._id}
                    >
                      {loadingProductId === product._id ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
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
              <p className="text-gray-600 mb-8">
                We couldn't find any saffron products at the moment.
              </p>
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