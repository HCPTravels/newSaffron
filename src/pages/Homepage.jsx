import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Star, Zap, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useAuth();

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backendUrl}/api/product/approved/product`);
        if (response.data) {
          setProducts(response.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchApprovedProducts();
  }, [backendUrl]);

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
  
      console.log('=== Adding to Cart ===');
      console.log('Backend URL:', backendUrl);
      console.log('Full URL:', `${backendUrl}/api/cart/add`);
      console.log('Product ID:', product._id);
      console.log('Token exists:', !!token);
      console.log('Token preview:', token?.substring(0, 20) + '...');
      console.log('Cart data:', cartData);
  
      // Try different possible cart endpoints
      const possibleEndpoints = [
        '/api/cart/add',
        '/api/cart',
        '/api/carts/add',
        '/api/user/cart/add'
      ];
      
      let success = false;
      let lastError = null;
      
      for (const endpoint of possibleEndpoints) {
        try {
          console.log(`Trying endpoint: ${backendUrl}${endpoint}`);
          
          const response = await axios.post(`${backendUrl}${endpoint}`, cartData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            timeout: 10000, // Reduced timeout to 10 seconds
          });
          
          console.log(`Success with endpoint ${endpoint}:`, response.data);
          success = true;
          break;
          
        } catch (error) {
          console.log(`Failed with endpoint ${endpoint}:`, error.response?.status || error.code);
          lastError = error;
          
          // If we get a 404, try the next endpoint
          if (error.response?.status === 404) {
            continue;
          }
          
          // If it's not a 404, this might be the right endpoint with a different issue
          if (error.response?.status !== 404) {
            throw error;
          }
        }
      }
      
      if (!success) {
        throw lastError || new Error('All cart endpoints failed');
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
      console.error('Error adding to cart:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      // Better error handling
      let errorMessage = "Failed to add item to cart";
      let errorDetails = "";
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = "Server is taking too long to respond";
        errorDetails = "The cart API might be hanging. Please check your backend logs.";
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        errorMessage = "Cannot connect to server";
        errorDetails = "Please make sure your backend server is running on http://localhost:5001";
      } else if (error.response) {
        console.log('Error response status:', error.response.status);
        console.log('Error response data:', error.response.data);
        
        if (error.response.status === 401) {
          errorMessage = "Authentication failed";
          errorDetails = "Please login again";
        } else if (error.response.status === 404) {
          errorMessage = "Cart API not found";
          errorDetails = "Please check if the cart API endpoint exists in your backend";
        } else if (error.response.status === 400) {
          errorMessage = error.response.data?.message || "Invalid request";
          errorDetails = "Please check the request data format";
        } else if (error.response.status >= 500) {
          errorMessage = "Server error";
          errorDetails = "Please check your backend logs for details";
        }
      } else if (error.request) {
        errorMessage = "Network error";
        errorDetails = "Please check your internet connection and backend server";
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

  // Add a function to test backend connectivity
  const testBackendConnection = async () => {
    try {
      console.log('Testing backend connection with products endpoint...');
      // Since /api/health doesn't exist, let's test with the products endpoint that works
      const response = await axios.get(`${backendUrl}/api/product/approved/product`, {
        timeout: 5000,
      });
      console.log('Backend is reachable via products endpoint');
      return true;
    } catch (error) {
      console.error('Backend is not reachable:', error.message);
      return false;
    }
  };

  // Test if cart endpoint exists
  const testCartEndpoint = async () => {
    try {
      console.log('Testing cart endpoint...');
      // Make a test request to see if endpoint exists
      const response = await axios.get(`${backendUrl}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: 5000,
      });
      console.log('Cart endpoint is reachable');
      return true;
    } catch (error) {
      console.error('Cart endpoint test failed:', error.response?.status, error.message);
      return false;
    }
  };

  // Test connection on component mount
  useEffect(() => {
    if (backendUrl) {
      testBackendConnection();
      if (token) {
        testCartEndpoint();
      }
    }
  }, [backendUrl, token]);
  
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
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Harvesting the Finest Saffron</h3>
        <p className="text-gray-600 mb-6">
          We're carefully gathering the world's most precious saffron threads for you. Each strand is being hand-selected for quality.
        </p>
        <div className="flex justify-center gap-2">
          {['Kashmir', 'Iran', 'Spain'].map((origin) => (
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
            Discover premium saffron from Kashmir, Iran, and Spain. Each thread carefully selected for exceptional quality and flavor.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
          >
            <Star className="w-5 h-5 text-amber-200 fill-current" />
            <span className="text-amber-100 font-medium">Trusted by chefs worldwide</span>
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
                className="group bg-white border-2 border-black rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer relative z-40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0.1 }}
                    whileHover={{ opacity: 0.15 }}
                  >
                    <div className="text-7xl font-black text-amber-400/20 transition-colors duration-300">
                      {product.origin?.charAt(0) || 'S'}
                    </div>
                  </motion.div>
                  
                  <div className="absolute top-4 right-4">
                    <motion.span 
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        product.grade === 'premium' 
                          ? 'bg-gradient-to-r from-amber-500 to-[#ff6523] text-white shadow-md' 
                          : product.grade === 'category1' 
                          ? 'bg-gradient-to-r from-[#ff6523] to-orange-500 text-white' 
                          : 'bg-gray-200 text-gray-800'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {product.grade === 'premium' && <Zap className="w-3 h-3 mr-1" />}
                      {product.grade === 'premium' && 'Premium'}
                      {product.grade === 'category1' && 'Category I'}
                      {product.grade === 'category2' && 'Category II'}
                      {product.grade === 'category3' && 'Category III'}
                      {product.grade === 'bunch' && 'Bunch'}
                    </motion.span>
                  </div>

                  {product.rating && (
                    <motion.div 
                      className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-800 font-semibold">{product.rating}</span>
                    </motion.div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#ff6523] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 font-medium">{product.origin}</span>
                      {product.crocin && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                          {product.crocin} Crocin
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      <div className="text-sm text-gray-500">per gram</div>
                    </div>
                    <motion.button 
                      className="px-4 py-2 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg relative z-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      whileHover={{ scale: loadingProductId === product._id ? 1 : 1.05 }}
                      whileTap={{ scale: loadingProductId === product._id ? 1 : 0.95 }}
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">No products available</h3>
              <p className="text-gray-600 mb-8">We couldn't find any saffron products at the moment.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;