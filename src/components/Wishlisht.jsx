import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../pages/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const Wishlist = () => {
  const { token } = useAuth();
  const { addToCart } = useCart();
  const {
    wishlist,
    getWishlistCount,
    wishlistSet,
    loadingSet,
    toggleWishlist,
    isInWishlist, // ✅ Add this
  } = useWishlist();

  const [loadingProductId, setLoadingProductId] = useState(null);

  const handleAddToCart = async (product) => {
    try {
      setLoadingProductId(product._id);
      await addToCart(product._id);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleWishlistToggle = (product) => {
    toggleWishlist(product._id, {
      name: product.name,
      price: product.price,
      image: product.image,
      images: product.images,
      description: product.description,
      category: product.category,
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <div className="bg-primary-100 p-6 rounded-full mb-6">
          <FiHeart className="text-primary-600 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Looks like you haven't added anything to your wishlist yet. Start exploring and add items you love!
        </p>
        <button
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          onClick={() => window.location.href = "/products"}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Wishlist</h1>
        <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
          {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onSelectProduct={() => {}}
            onAddToCart={() => handleAddToCart(product)}
            onWishlistToggle={() => handleWishlistToggle(product)}
            // ✅ FIXED: Use correct prop names that ProductCard expects
            isInWishlist={isInWishlist(product._id)}
            isWishlistLoading={loadingSet.has(product._id)}
            loadingProductId={loadingProductId}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;