import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, [token]);

  const emailOtp = async (email) => {
    try {
      const res = await axios.post("https://backendsaffron.onrender.com/api/email/send-otp", { email });
      console.log("Email OTP response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Email OTP request failed:", error);
      console.error("Error details:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        const errorMessage = error.response?.data?.message || "Authentication failed";
        
        if (errorMessage.includes("User already exists")) {
          // User exists, they should log in instead
          throw new Error("Account already exists. Please log in instead of signing up.");
        } else if (errorMessage.includes("Please log in")) {
          // User exists but needs to log in
          throw new Error("Please log in to access your account.");
        } else {
          // Other 401 errors
          throw new Error("Authentication failed. Please try again.");
        }
      } else if (error.response?.status === 404) {
        throw new Error("Service not found. Please check your connection.");
      } else if (error.response?.status === 500) {
        throw new Error("Server error. Please try again later.");
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error("Cannot connect to server. Please check if the server is running.");
      } else {
        // Generic error message
        throw new Error(error.response?.data?.message || "Failed to send OTP. Please try again.");
      }
    } 
  }

  const verifyOtp = async ({ email, otp }) => {
    console.log("=== FRONTEND DEBUG ===");
    console.log("Function called with:", { email, otp });
    console.log("Email:", email, "Type:", typeof email, "Length:", email?.length);
    console.log("OTP:", otp, "Type:", typeof otp, "Length:", otp?.length);
    
    try {
      const payload = { email, otp };
      console.log("Sending payload:", payload);
      console.log("Payload JSON:", JSON.stringify(payload));
      
      const res = await axios.post("https://backendsaffron.onrender.com/api/email/verify-otp", payload);
      console.log("Success response:", res.data);
      
      // ... rest of your code
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      throw error;
    }
  };

  const signUp = async (formData) => {
    try {
      const res = await axios.post("https://backendsaffron.onrender.com/api/users/signup", formData);
      console.log("Signup response:", res.data);
      if (res.data.success) {
        const { user, token } = res.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return res.data;
    } catch (error) {
      if (error.response?.status === 409) {
        // Show specific alert or return message
        alert("An account with this email or phone number already exists.");
      } else {
        console.error("Signup failed:", error);
        alert("Signup failed. Please try again.");
      }
      throw error;
    }
  };



  const logIn = async ({ email, password }) => {
    try {
      const res = await axios.post("https://backendsaffron.onrender.com/api/users/login", { email, password });
      console.log("Login response:", res.data); // Debug log
      
      // Check if response has success flag
      if (res.data.success) {
        const { user, token } = res.data;
        console.log("Setting user:", user); // Debug log
        console.log("Setting token:", token); // Debug log
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        // If no success flag, but we have user and token directly
        const { user, token } = res.data;
        if (user && token) {
          console.log("No success flag, but setting user:", user); // Debug log
          console.log("No success flag, but setting token:", token); // Debug log
          setUser(user);
          setToken(token);
          localStorage.setItem("token", token);
        }
      }
      return res.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("User logged out successfully");
  };
  const loginWithGoogle = async (googleToken) => {
    try {
      const res = await axios.post("https://backendsaffron.onrender.com/api/users/google-login", {
        token: googleToken,
      });
      if (res.data.success) {
        const { user, token } = res.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return res.data;
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signUp, logIn, logout, loginWithGoogle, emailOtp, verifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);