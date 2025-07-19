import React, { useEffect } from "react";
import {
  Search,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const Home = ({ onSelectProduct }) => {
  const { addToCart } = useCart();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token, isLoading } = useAuth();
  const {
    wishlistSet,
    loadingSet,
    toggleWishlist,
    isInWishlist,
    isLoading: wishlistIsLoading,
  } = useWishlist();
  const {
    products,
    isProductsLoading,
    error,
    fetchProducts,
    setProducts,
  } = useProductContext();

  useEffect(() => {
    if (backendUrl && products.length === 0 && !isProductsLoading) {
      fetchProducts(backendUrl, token);
    }
  }, [backendUrl, token, fetchProducts, products.length, isProductsLoading]);

  const handleAddToCart = async (product) => {
    // ...same as before
    // You may want to add a loading state per product if needed
    try {
      await addToCart(product._id);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const handleWishlistToggle = async (product) => {
    const isUserAuthenticated = !!(token && token.length > 0);
    if (!isUserAuthenticated) {
      toast.error("Please log in to add items to your wishlist");
      return;
    }
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

  if (isProductsLoading && products.length === 0) {
    return (
      <div className="min-h-screen relative">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
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
        {isProductsLoading && products.length === 0 ? (
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
                isInWishlist={isInWishlist(product._id)}
                isWishlistLoading={loadingSet.has(product._id)}
                // loadingProductId={loadingProductId} // If you want per-product loading
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
                onClick={() => {
                  setProducts([]); // Clear cache
                  fetchProducts(backendUrl, token);
                }}
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