import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) return null; // or loading spinner

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Redirect admin users to adminpanel
  if (user.role === "admin") {
    return <Navigate to="/adminpanel" replace />;
  }

  return children;
};

export default ProtectedRoute;