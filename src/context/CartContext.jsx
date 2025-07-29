import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"; // Assuming you're using react-toastify
import { useAuth } from "./AuthContext"; // Adjust path as needed

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [estimatedDelivery] = useState("3-5 business days");
  const [showPayment, setShowPayment] = useState(false);

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${backendUrl}/api/cart/getcartproduct`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.items) {
        setCartItems(response.data.items);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart items");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchCartItems();
  }, [token]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    setUpdatingItem(productId);

    // Store original state for rollback
    const originalCartItems = [...cartItems];

    try {
      // 1. Optimistic UI update
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      // 2. Make API call
      const response = await axios.patch(
        `${backendUrl}/api/cart/updatequantity/${productId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000, // Increased timeout
        }
      );

      // 3. Verify response and update with server data
      if (response.data?.success) {
        // If server returns updated cart items, use them
        if (response.data?.cart?.items) {
          setCartItems(response.data.cart.items);
        }
        toast.success("Quantity updated successfully");
      } else {
        throw new Error("Server returned unsuccessful response");
      }
    } catch (error) {
      console.error("Update quantity error:", error);

      // Rollback to original state
      setCartItems(originalCartItems);

      // Show appropriate error message
      let errorMessage = "Failed to update quantity";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Please try again.";
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }

      toast.error(errorMessage);

      // Optionally refetch from server to ensure consistency
      // fetchCartItems();
    } finally {
      setUpdatingItem(null);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    setRemovingItem(productId);

    // Store original state for rollback
    const originalCartItems = [...cartItems];

    try {
      // Optimistic UI update
      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );

      const response = await axios.delete(
        `${backendUrl}/api/cart/removeitem/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        }
      );

      if (response.data?.success) {
        toast.success("Item removed successfully");
      } else {
        throw new Error("Server returned unsuccessful response");
      }
    } catch (error) {
      console.error("Remove item error:", error);

      // Rollback to original state
      setCartItems(originalCartItems);

      toast.error("Failed to remove item. Please try again.");
    } finally {
      setRemovingItem(null);
    }
  };

  // Add item to cart (you might need this too)
  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        }
      );

      if (response.data?.success) {
        // Refresh cart items after adding
        await fetchCartItems();
        toast.success("Item added to cart successfully");
      } else {
        throw new Error("Server returned unsuccessful response");
      }
    } catch (error) {
      console.error("Add to cart error:", error);

      let errorMessage = "Failed to add item to cart";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    }
  };

  // Clear entire cart (backend call)
  const clearCart = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/api/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      if (response.data?.success) {
        setCartItems([]);
        setPromoCode("");
        setPromoApplied(false);
        setDiscount(0);
        toast.success("Cart cleared successfully");
      } else {
        throw new Error("Server returned unsuccessful response");
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Failed to clear cart");
    }
  };

  // Clear cart locally (immediate UI update without backend call)
  const clearCartLocal = () => {
    console.log("Clearing cart locally...");
    setCartItems([]);
    setPromoCode("");
    setPromoApplied(false);
    setDiscount(0);
    setUpdatingItem(null);
    setRemovingItem(null);
    setShowPayment(false);
  };

  // Calculate total price
  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    return subtotal - discount;
  };

  // Calculate total items count
  const getTotalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Apply promo code
  const applyPromoCode = async (code) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/apply-promo`,
        { code },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.success) {
        setPromoCode(code);
        setPromoApplied(true);
        setDiscount(response.data.discount);
        toast.success("Promo code applied successfully");
      } else {
        throw new Error("Invalid promo code");
      }
    } catch (error) {
      console.error("Apply promo error:", error);
      toast.error("Invalid promo code");
    }
  };

  // Remove promo code
  const removePromoCode = () => {
    setPromoCode("");
    setPromoApplied(false);
    setDiscount(0);
  };

  const contextValue = {
    // State
    cartItems,
    isLoading,
    updatingItem,
    removingItem,
    promoCode,
    promoApplied,
    discount,
    estimatedDelivery,
    showPayment,

    // Actions
    fetchCartItems,
    updateQuantity,
    removeFromCart,
    addToCart,
    clearCart,
    clearCartLocal, // Added this method
    applyPromoCode,
    removePromoCode,

    // Computed values
    getTotalPrice,
    getTotalItems,

    // Setters (if needed in components)
    setShowPayment,
    setPromoCode,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;