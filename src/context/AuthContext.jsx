import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
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
      let userData = null;
      try {
        userData = JSON.parse(storedUser);
      } catch (e) {
        userData = null;
      }
      if (userData) {
        setUser(userData);

        // ✅ Check if user is already logged in and redirect appropriately
        if (userData.role === "admin") {
          navigate("/adminpanel", { replace: true });
        } else if (window.location.pathname === "/login") {
          navigate("/profile", { replace: true });
        }
      }
    }

    if (storedSeller && storedToken) setSeller(JSON.parse(storedSeller));
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setIsLoading(false);
  }, [navigate]);

  const emailOtp = async (email) => {
    try {
      const res = await axios.post(`${backendUrl}/api/email/send-otp`, {
        email,
      });
      console.log("Email OTP response:", res.data);
      return res.data;
    } catch (error) {
      if (error.response?.status === 401) {
        const msg = error.response?.data?.message || "Authentication failed";
        if (msg.includes("User already exists")) {
          throw new Error("Account already exists. Please log in instead.");
        } else if (msg.includes("Please log in")) {
          throw new Error("Please log in to access your account.");
        } else {
          throw new Error("Authentication failed. Please try again.");
        }
      } else if (error.response?.status === 404) {
        throw new Error("Service not found. Please check your connection.");
      } else if (error.response?.status === 500) {
        throw new Error("Server error. Please try again later.");
      } else if (error.code === "ECONNREFUSED") {
        throw new Error(
          "Cannot connect to server. Please check if the server is running."
        );
      } else {
        throw new Error(
          error.response?.data?.message ||
            "Failed to send OTP. Please try again."
        );
      }
    }
  };

  const verifyOtp = async ({ email, otp }) => {
    try {
      const res = await axios.post(`${backendUrl}/api/email/verify-otp`, {
        email,
        otp,
      });
      if (res.data.success) {
        const { token, email: verifiedEmail } = res.data;
        if (token && verifiedEmail) {
          setEmail(verifiedEmail);
          setToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("email", verifiedEmail);
        }
        return res.data;
      } else {
        throw new Error(res.data.message || "OTP verification failed");
      }
    } catch (error) {
      if (error.response?.status === 500) {
        throw new Error("Server error occurred. Please try again.");
      } else if (error.response?.status === 400) {
        throw new Error(
          error.response?.data?.message || "Invalid OTP or email"
        );
      } else if (error.response?.status === 404) {
        throw new Error("OTP not found or expired. Please request a new OTP.");
      } else if (error.response?.status === 401) {
        throw new Error("OTP verification failed. Please check your OTP.");
      } else {
        throw new Error(
          error.response?.data?.message || "OTP verification failed."
        );
      }
    }
  };

  const signUp = async (formData) => {
    try {
      const res = await axios.post(`${backendUrl}/api/user/signup`, formData);
      if (res.data.success) {
        const { user, token } = res.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Use replace to avoid going back to signup
        navigate("/profile", { replace: true });
      }
      return res.data;
    } catch (error) {
      if (error.response?.status === 409) {
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
      const res = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      console.log("Backend response:", res.data);

      if (res.data.success) {
        const { user, token } = res.data;

        if (!user) {
          throw new Error("No user data received from server");
        }

        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(token)
        console.log("User set in context:", user);

        // ✅ Navigate immediately with replace to remove login from history
        if (user.role === "admin") {
          navigate("/adminpanel", { replace: true });
        } else {
          navigate("/profile", { replace: true });
        }
      }

      return res.data;
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw error;
      } else {
        throw new Error("Login failed. Please try again.");
      }
    }
  };

  const logout = () => {
    setUser(null);
    setSeller(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("seller");
    localStorage.removeItem("email");

    // ✅ Use replace to avoid going back to protected pages
    navigate("/login", { replace: true });
    console.log("User/seller logged out successfully");
  };

  const loginWithGoogle = async (googleToken) => {
    try {
      const res = await axios.post(`${backendUrl}/api/users/google-login`, {
        token: googleToken,
      });
      if (res.data.success) {
        const { user, token } = res.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Navigate with replace
        navigate("/profile", { replace: true });
      }
      return res.data;
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed.");
      throw error;
    }
  };

  const sellerSignUp = async (formData) => {
    try {
      const res = await axios.post(`${backendUrl}/api/seller/create`, formData);
      if (res.data.success) {
        const { seller, token } = res.data;
        setSeller(seller);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("seller", JSON.stringify(seller));

        // ✅ Navigate to seller dashboard
        navigate("/sellerdashboard", { replace: true });
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
      const res = await axios.post(`${backendUrl}/api/seller/login`, {
        email,
        password,
      });

      if (res.data.success) {
        const { seller, token } = res.data;
        if (seller && token) {
          setSeller(seller);
          setToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("seller", JSON.stringify(seller));

          // ✅ Navigate to seller dashboard
          navigate("/sellerdashboard", { replace: true });
          return res.data;
        } else {
          alert("Login failed - incomplete response data");
          return null;
        }
      } else {
        alert("Seller login failed. Please check your credentials.");
        return null;
      }
    } catch (err) {
      console.error("Seller login error:", err);
      alert("Seller login failed. Please try again.");
      throw err;
    }
  };

  const createProduct = async (productData) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/create`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Product creation failed:", error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(
        `${backendUrl}/api/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        console.log("Product deleted successfully");
        return res.data;
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Product deletion failed:", error);
      throw error;
    }
  };

  const forgotSendOtp = async (email) => {
    try {
      const res = await axios.post(`${backendUrl}/api/forget/send-forget-otp`, { email });
      return res.data;
    } catch (error) {
      console.error("Forgot password failed:", error);
      throw error;
    }
  };

  const verifyForgotOtp = async ({ email, otp }) => {

    try {
      const res = await axios.post(`${backendUrl}/api/forget/verify-forget-otp`, { email, otp });
      return res.data;
    } catch (error) {
      console.error("Forgot password failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        createProduct,
        deleteProduct,
        user,
        token,
        isLoading,
        signUp,
        logIn,
        logout,
        loginWithGoogle,
        emailOtp,
        verifyOtp,
        sellerSignUp,
        seller,
        sellerLogin,
        email,
        setEmail,
        forgotSendOtp,
        verifyForgotOtp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
