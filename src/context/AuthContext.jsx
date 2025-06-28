import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  // Auto-fetch user if token exists
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!token) {
  //       setIsLoading(false);
  //       return;
  //     }

  //     try {
  //       console.log("Fetching user with token:", token); // Debug log
  //       const res = await axios.get("http://localhost:5001/api/users/login", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log("User fetch response:", res.data); // Debug log
  //       setUser(res.data.user);
  //     } catch (error) {
  //       console.error("Failed to fetch user from token:", error);
  //       logout(); // Clean up on error
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [token]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, [token]);
  
  const signUp = async (formData) => {
    try {
      const res = await axios.post("https://backendsaffron.onrender.com/api/users/signup", formData);
      console.log("Signup response:", res.data); // Debug log
      if (res.data.success) {
        const { user, token } = res.data;
        console.log("Setting user:", user); // Debug log
        console.log("Setting token:", token); // Debug log
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
      }
      return res.data;
    } catch (error) {
      console.error("Signup failed:", error);
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
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signUp, logIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);