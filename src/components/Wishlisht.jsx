import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../pages/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import { FiHeart, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";

const Wishlist = () => {
  const { token } = useAuth();
  const { addToCart } = useCart();
  const {
    wishlist,
    getWishlistCount,
    wishlistSet,
    loadingSet,
    toggleWishlist,
    isInWishlist,
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
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="bg-white rounded-3xl shadow-sm p-10 max-w-md w-full text-center border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-50 w-20 h-20 flex items-center justify-center rounded-full">
              <img src={SaffronIcon} alt="Saffron" className="w-12 h-12" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-6">
            Start exploring and add items you love to your wishlist!
          </p>
          <button
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2 mx-auto shadow-md hover:shadow-lg"
            onClick={() => window.location.href = "/dashboard"}
          >
            Browse Products
            <FiArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-white mb-3">Your Wishlist</h1>
        <div className="inline-flex items-center bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full">
          <img src={SaffronIcon} alt="Saffron" className="w-4 h-4 mr-2" />
          {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onSelectProduct={() => {}}
            onAddToCart={() => handleAddToCart(product)}
            onWishlistToggle={() => handleWishlistToggle(product)}
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