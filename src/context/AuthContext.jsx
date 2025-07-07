import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [seller, setSeller] = useState(null);
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedSeller = localStorage.getItem("seller");
    const storedToken = localStorage.getItem("token");
  
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  
    if (storedSeller && storedToken) {
      setSeller(JSON.parse(storedSeller));
    }
  
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  
    setIsLoading(false);
  }, []);

  // Function to send OTP to email

  const emailOtp = async (email) => {
    try {
      const res = await axios.post("https://backendsaffron.onrender.com/api/email/send-otp", { email });
      console.log("Email OTP response:", res.data);
      return res.data;
    } catch (error) {
     
      
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
    try {
      const payload = { email, otp };
      console.log("Sending payload:", payload);
      console.log("Payload JSON:", JSON.stringify(payload));
      
      const res = await axios.post("https://backendsaffron.onrender.com/api/email/verify-otp", payload);
      console.log("Success response:", res.data);
      
      // Handle successful verification
      if (res.data.success) {
        if (res.data.token && res.data.email) {
          setEmail(res.data.email); // ✅ Correctly store verified email
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", res.data.email); // Optional: persist
        }
        // For email verification, you might just want to return success
        return res.data;
      } else {
        throw new Error(res.data.message || "OTP verification failed");
      }
      
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      // Handle specific error cases
      if (error.response?.status === 500) {
        throw new Error("Server error occurred. Please try again or contact support.");
      } else if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || "Invalid OTP or email";
        throw new Error(errorMessage);
      } else if (error.response?.status === 404) {
        throw new Error("OTP not found or expired. Please request a new OTP.");
      } else if (error.response?.status === 401) {
        throw new Error("OTP verification failed. Please check your OTP and try again.");
      } else {
        throw new Error(error.response?.data?.message || "OTP verification failed. Please try again.");
      }
    }
  };

  //user signup and login functions

  const signUp = async (formData) => {
    try {
      const res = await axios.post("https://backendsaffron.onrender.com/api/user/signup", formData);
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
      const res = await axios.post("https://backendsaffron.onrender.com/api/user/login", { email, password });
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
    setSeller(null); // clear seller
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("seller"); // also remove seller
    console.log("User/seller logged out successfully");
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

  // seller signup and login functions

  const sellerSignUp = async (formData) => {
    try {
      const res = await axios.post("https://backendsaffron.onrender.com/api/seller/create", formData);
      console.log("Seller signup response:", res.data);
  
      if (res.data.success) {
        const { seller, token } = res.data;
        setSeller(seller);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("seller", JSON.stringify(seller));
      }
  
      return res.data;
    } catch (error) {
      console.error("Seller signup failed:", error);
      alert("Seller signup failed. Please try again.");
      throw error;
    }
  };

  const sellerLogin = async ({ email, password }) => {
    try {
      const res = await axios.post("https://backendsaffron.onrender.com/api/seller/login", { email, password });
      
      if (!res.data) {
        console.error("No data in response");
        alert("Login failed - no response data");
        return;
      }
      
      console.log("Response data structure:", JSON.stringify(res.data, null, 2));
      
      if (res.data.success) {
        const { seller, token } = res.data;
        console.log("Seller object:", seller);
        console.log("Token:", token);
        
        if (seller && token) {
          setSeller(seller);
          setToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("seller", JSON.stringify(seller));
          console.log("Seller login successful!");
          
          // ADD THIS LINE - Return the response data
          return res.data;
        } else {
          console.error("Missing seller or token in response");
          alert("Login failed - incomplete response data");
          return null;
        }
      } else {
        console.error("Seller login failed:", res.data.message || "Unknown error");
        alert("Seller login failed. Please check your credentials.");
        return null;
      }
  
    } catch (err) {
      console.error("Seller login error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      alert("Seller login failed. Please try again.");
      throw err;
    }
  };
  return (
    <AuthContext.Provider value={{ user, token, isLoading, signUp, logIn, logout, loginWithGoogle, emailOtp, verifyOtp ,sellerSignUp, seller, sellerLogin, email, setEmail}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);