import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../pages/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // fix import (you forgot curly braces)

const Wishlist = () => {
  const { token } = useAuth();
  const { addToCart } = useCart();
  const {
    wishlist,
    wishlistSet,
    loadingSet,
    fetchWishlist,
    toggleWishlist,
  } = useWishlist();

  const [loadingProductId, setLoadingProductId] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const handleAddToCart = async (product) => {
    try {
      setLoadingProductId(product._id);
      await addToCart(product._id); // already shows toast inside context
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {wishlist.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onSelectProduct={() => {}}
          onAddToCart={() => handleAddToCart(product)}
          onWishlistToggle={() => toggleWishlist(product._id)}
          wishlist={wishlistSet}
          wishlistLoading={loadingSet}
          loadingProductId={loadingProductId}
        />
      ))}
    </div>
  );
};

export default Wishlist;