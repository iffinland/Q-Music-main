// src/context/AuthProvider.jsx
import React, { useState } from 'react';
import { AuthContext } from './AuthContext'; // Impordime just loodud contexti

/* global qortalRequest */

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [stats] = useState({ songs: 0, playlists: 0, publishers: 0 }); // Ajutine staatiline statistika
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const login = async () => {
    setIsAuthLoading(true);
    // ... (Siia läheb sinu päris handleLogin loogika, ma panen siia lühema versiooni)
    alert("Login funktsioon käivitatud (AuthProviderist)");
    // Näidis, mis simuleerib sisselogimist
    setTimeout(() => {
      setIsLoggedIn(true);
      setCurrentUser({ name: 'Test Kasutaja' });
      setIsAuthLoading(false);
    }, 1000);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    alert("Oled välja logitud (AuthProviderist).");
  };

  const value = { isLoggedIn, currentUser, stats, isAuthLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};