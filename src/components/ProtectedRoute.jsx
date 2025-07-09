import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, token, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null; // or loading spinner

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Only redirect admin users to adminpanel from specific routes
  // Allow admins to access profile and other protected routes
  if (user.role === "admin" && location.pathname === "/") {
    return <Navigate to="/adminpanel" replace />;
  }

  return children;
};

export default ProtectedRoute;