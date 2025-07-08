// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) return null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;