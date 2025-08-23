/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Optional: persist login state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
