import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsUserLogged(true);
  };
  const logout = () => {
    setUser(null);
    setIsUserLogged(false);
  };

  useEffect(() => {
    <Navigate to="/home" />;
  }, [isUserLogged]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
