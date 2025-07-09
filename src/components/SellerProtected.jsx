import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SellerProtectedRoute = ({ children }) => {
  const { seller, token, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fe6522]"></div>
      </div>
    );
  }

  // Fallback to localStorage if context is not available
  let sellerData = seller;
  let tokenData = token;

  if (!sellerData || !tokenData) {
    try {
      const storedToken = localStorage.getItem("token");
      const storedSeller = localStorage.getItem("seller");
      
      tokenData = storedToken;
      sellerData = storedSeller ? JSON.parse(storedSeller) : null;
    } catch (error) {
      console.error("Error parsing seller data from localStorage:", error);
      // Clear corrupted data
      localStorage.removeItem("seller");
      localStorage.removeItem("token");
    }
  }

  // Check if seller is authenticated
  if (!tokenData || !sellerData) {
    return <Navigate to="/sellerlogin" replace />;
  }

  // Optional: Add token expiration check
  try {
    // Basic JWT token validation (decode payload to check expiration)
    const tokenPayload = JSON.parse(atob(tokenData.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (tokenPayload.exp && tokenPayload.exp < currentTime) {
      // Token is expired, clear storage and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("seller");
      return <Navigate to="/sellerlogin" replace />;
    }
  } catch (error) {
    // If token is malformed, redirect to login
    console.error("Invalid token format:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("seller");
    return <Navigate to="/sellerlogin" replace />;
  }

  return children;
};

export default SellerProtectedRoute;