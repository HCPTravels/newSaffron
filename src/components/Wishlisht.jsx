import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  Heart,
  HeartOff,
  Loader2,
  ShoppingCart,
  ArrowLeft,
  Trash2,
  Search,
  Bug,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import useWishlist from "../hooks/useWishlist";
import ProductCard from "../pages/ProductCard";

const Wishlist = ({ onSelectProduct, onNavigateBack }) => {
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [isAddingAll, setIsAddingAll] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  const { token, isLoading: authLoading } = useAuth();
  const { addToCart } = useCart();
  const { 
    wishlist, 
    wishlistProducts, 
    wishlistLoading, 
    isLoading, 
    error, 
    hasInitialized,
    toggleWishlist,
    clearWishlist,
    retryFetch,
    debugWishlistSync
  } = useWishlist(token);

  // Check if user is authenticated
  const isAuthenticated = !!(token && token.length > 0);

  // Debug logging
  console.log("🔍 Wishlist Page Debug:", {
    wishlistSize: wishlist.size,
    wishlistArray: [...wishlist],
    productsLength: wishlistProducts.length,
    productsIds: wishlistProducts.map(p => p._id),
    hasInitialized,
    isLoading,
    isAuthenticated
  });

  // Handle add to cart
  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart");
      return;
    }

    setLoadingProductId(product._id);

    try {
      await addToCart(product._id);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setLoadingProductId(null);
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async (product) => {
    if (!isAuthenticated) {
      toast.error("Please log in to manage your wishlist");
      return;
    }

    try {
      await toggleWishlist(product);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  // Handle clear wishlist
  const handleClearWishlist = async () => {
    setIsClearing(true);
    try {
      await clearWishlist();
    } catch (error) {
      console.error("Error clearing wishlist:", error);
    } finally {
      setIsClearing(false);
    }
  };

  // Add all to cart
  const addAllToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart");
      return;
    }

    if (wishlistProducts.length === 0) {
      toast.error("Your wishlist is empty");
      return;
    }

    setIsAddingAll(true);

    try {
      const promises = wishlistProducts.map(product => 
        addToCart(product._id).catch(err => {
          console.error(`Failed to add ${product.name} to cart:`, err);
          return { error: true, product };
        })
      );

      const results = await Promise.all(promises);
      const failures = results.filter(result => result?.error);

      if (failures.length === 0) {
        toast.success(`All ${wishlistProducts.length} items added to cart`);
      } else {
        toast.warning(`${wishlistProducts.length - failures.length} items added to cart, ${failures.length} failed`);
      }
    } catch (error) {
      console.error("Error adding all to cart:", error);
      toast.error("Failed to add items to cart");
    } finally {
      setIsAddingAll(false);
    }
  };

  // Debug component
  const DebugInfo = () => (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="font-bold text-yellow-800 mb-2">Debug Information</h3>
      <div className="text-sm text-yellow-700 space-y-1">
        <p><strong>Wishlist Set size:</strong> {wishlist.size}</p>
        <p><strong>Wishlist Set contents:</strong> [{[...wishlist].join(', ')}]</p>
        <p><strong>Products array length:</strong> {wishlistProducts.length}</p>
        <p><strong>Products array IDs:</strong> [{wishlistProducts.map(p => p._id).join(', ')}]</p>
        <p><strong>Has initialized:</strong> {hasInitialized ? 'Yes' : 'No'}</p>
        <p><strong>Is loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
        <p><strong>Is authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {error ? error.message : 'None'}</p>
      </div>
    </div>
  );

  // Loading state component
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
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-100 to-red-500 flex items-center justify-center shadow-lg">
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
          Loading Your Wishlist
        </h3>
        <p className="text-gray-600">
          Fetching your favorite saffron products...
        </p>
      </motion.div>
    </motion.div>
  );

  // Empty state component
  const EmptyState = () => (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        <motion.div
          className="w-24 h-24 bg-gradient-to-r from-pink-100 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <HeartOff className="w-12 h-12 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Your Wishlist is Empty
        </h3>
        <p className="text-gray-600 mb-8">
          Start building your collection of premium saffron products
        </p>

        <motion.button
          onClick={onNavigateBack}
          className="px-6 py-3 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue Shopping
        </motion.button>
      </div>
    </motion.div>
  );

  // Error state component
  const ErrorState = () => (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        <motion.div
          className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          <Search className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Failed to Load Wishlist
        </h3>
        <p className="text-gray-600 mb-8">
          Unable to fetch your wishlist. Please try again.
        </p>

        <motion.button
          onClick={retryFetch}
          className="px-6 py-3 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 mr-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retry
        </motion.button>
        
        <motion.button
          onClick={onNavigateBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back
        </motion.button>
      </div>
    </motion.div>
  );

  // Authentication check
  if (!isAuthenticated && !authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Toaster richColors closeButton />
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="max-w-md mx-auto">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Please Log In
            </h3>
            <p className="text-gray-600 mb-8">
              You need to be logged in to view your wishlist
            </p>
            <motion.button
              onClick={onNavigateBack}
              className="px-6 py-3 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Login
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Toaster richColors closeButton />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Debug Toggle */}
        <div className="mb-4">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm"
          >
            <Bug className="w-4 h-4" />
            {showDebug ? 'Hide Debug' : 'Show Debug'}
          </button>
        </div>

        {/* Debug Info */}
        {showDebug && <DebugInfo />}

        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onNavigateBack}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-current" />
                Your Wishlist
              </h1>
              <p className="text-gray-600 mt-1">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {wishlistProducts.length > 0 && (
            <div className="flex gap-3">
              <motion.button
                onClick={addAllToCart}
                disabled={isAddingAll}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-medium rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAddingAll ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
                Add All to Cart
              </motion.button>

              <motion.button
                onClick={handleClearWishlist}
                disabled={isClearing}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isClearing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Clear All
              </motion.button>

              <motion.button
                onClick={debugWishlistSync}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Debug
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Content */}
        {isLoading && !hasInitialized ? (
          <LoadingState />
        ) : error && wishlistProducts.length === 0 ? (
          <ErrorState />
        ) : wishlistProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlistToggle}
                wishlist={wishlist}
                wishlistLoading={wishlistLoading}
                loadingProductId={loadingProductId}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default Wishlist;