import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Star, Zap, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import axios from 'axios';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backendUrl}/api/product/approved/product`);
        if (response.data) {
          setProducts(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchApprovedProducts();
  }, []);

  const handleAddToCart = (product) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Added to cart", {
        description: `${product.name} has been added to your cart.`,
        duration: 3000,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #ff6523, #e55a1d)",
          border: "1px solid #c2410c",
          color: "white",
        },
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Toaster richColors closeButton />
      
      {/* Enhanced Hero Section */}
      <div className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Decorative elements */}
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-[#ff6523]" />
          </div>
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
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Enhanced Product Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
                  {/* Large Origin Letter with subtle animation */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0.1 }}
                    whileHover={{ opacity: 0.15 }}
                  >
                    <div className="text-7xl font-black text-amber-400/20 transition-colors duration-300">
                      {product.origin?.charAt(0) || 'S'}
                    </div>
                  </motion.div>
                  
                  {/* Grade Badge with improved styling */}
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

                  {/* Rating Badge with animation */}
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

                {/* Enhanced Product Info */}
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
                      className="px-4 py-2 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                      onClick={() => handleAddToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
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