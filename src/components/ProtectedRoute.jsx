// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useAuth();

  console.log("ProtectedRoute - token:", token, "isLoading:", isLoading);

  if (isLoading) return null; // or a spinner
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;