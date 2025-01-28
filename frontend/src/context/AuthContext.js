// context/AuthContext.js
import { createContext, useState } from  "react";
import axios from "axios";
import PropTypes from "prop-types";

// create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (method, credentials) => {
    try {
      const res = await axios.post(`/auth/${method}`, credentials);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.PropTypes = {
    children: PropTypes.node.isRequired,
};