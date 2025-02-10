// context/AuthContext.js
import { createContext, useState, useCallback, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";


// create context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (method, credentials) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/auth/${method}`, credentials);
      const { token, user: loggedInUser } = res.data;
      localStorage.setItem("token", token);
      setUser(loggedInUser);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.response?.data?.message || "Login failed" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token and get user data
      axios.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser(res.data.user);
      }).catch(() => {
        localStorage.removeItem("token");
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export default AuthContext;