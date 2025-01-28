import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log(!!localStorage.getItem("user"));
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isUserLogged, setIsUserLogged] = useState(
    !!localStorage.getItem("user"),
  );

  const login = (userData) => {
    setUser(userData);
    setIsUserLogged(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsUserLogged(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isUserLogged }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

