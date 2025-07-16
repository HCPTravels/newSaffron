import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ImagePlus,
  Heart,
  Star,
  Loader2,
} from "lucide-react";

const ProductCard = ({
  product,
  onSelectProduct,
  onAddToCart,
  onWishlistToggle,
  isInWishlist = false,          // ✅ Changed from wishlist Set
  isWishlistLoading = false,     // ✅ Changed from wishlistLoading Set
  loadingProductId = null,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await onAddToCart(product);
      toast.success(`${product.name} has been added to your cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    onWishlistToggle(product);
  };

  const getGradeLabel = (grade) => {
    switch (grade) {
      case "premium":
        return "Premium";
      case "category1":
        return "Category I";
      case "category2":
        return "Category II";
      case "category3":
        return "Category III";
      case "bunch":
        return "Bunch";
      default:
        return grade;
    }
  };

  const getGradeStyles = (grade) => {
    return grade === "premium"
      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <motion.div
      onClick={() => onSelectProduct(product._id)}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 cursor-pointer ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="h-48 relative bg-gray-100 flex items-center justify-center">
        {product.images?.length > 0 && !imageError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            onError={handleImageError}
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
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getGradeStyles(
                product.grade
              )}`}
            >
              {getGradeLabel(product.grade)}
            </span>
          </div>
        )}

        {/* Wishlist Button - Top Left */}
        <motion.button
          className="absolute top-3 left-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm"
          onClick={handleWishlistToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isWishlistLoading}  // ✅ Changed from wishlistLoading.has(product._id)
        >
          {isWishlistLoading ? (  // ✅ Changed from wishlistLoading.has(product._id)
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          ) : (
            <Heart
              className={`h-4 w-4 transition-colors duration-200 ${
                isInWishlist  // ✅ Changed from wishlist.has(product._id)
                  ? "text-red-500 fill-current"
                  : "text-gray-500 hover:text-red-500"
              }`}
            />
          )}
        </motion.button>
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
          <span className="text-sm text-gray-500">{product.origin}</span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#ff6523]">
              ₹{parseFloat(product.price).toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 ml-1">per gram</span>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white text-xs font-medium rounded-lg hover:shadow-md transition-all whitespace-nowrap"
            onClick={handleAddToCart}
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
  );
};

export default ProductCard;