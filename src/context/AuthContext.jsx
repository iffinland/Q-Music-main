// src/context/AuthContext.js
import { createContext, useContext } from 'react';

// 1. Loome Contexti objekti
export const AuthContext = createContext(null);

// 2. Loome ja ekspordime kohandatud hooki
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};