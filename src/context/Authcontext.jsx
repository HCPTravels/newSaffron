import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const signUp = async (FormData) => {

        try{
            const res = await axios.post("http://localhost:5001/api/users/signup", FormData);
            if(res.data.success) {
                setUser(res.data.user);
                setToken(res.data.token);
                // Optionally, you can store the token in localStorage or cookies
                localStorage.setItem("token", res.data.token);
                return res.data;
            }
        }catch (error) {
            console.error("Error during sign up:", error);
            throw error;
        }
    }

    const login = async (email, password) => {
        try{
            const res = await axios.post("http://localhost:5001/api/users/login", { email, password });
            if(res.data.success) {
                setUser(res.data.user);
                setToken(res.data.token);
                // Optionally, you can store the token in localStorage or cookies
                localStorage.setItem("token", res.data.token);  
                return res.data;
            }

        }catch (error) {
            console.error("Error during login:", error);
            throw error;
    }
}
    const logout =() => {
        setUser(null);
        setToken(null);
        // Optionally, you can remove the token from localStorage or cookies
        localStorage.removeItem("token");

    }
    return(
        <AuthContext.Provider value={{ user, token, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext
    )

}
   