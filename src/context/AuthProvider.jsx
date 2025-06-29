// src/context/AuthProvider.jsx
import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

/* global qortalRequest */

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const login = async () => {
    if (typeof qortalRequest === 'undefined') {
      alert("Qortali API-t ei leitud.");
      return null; // Tagastame null, kui ebaõnnestub
    }
    setIsAuthLoading(true);
    try {
      const accountData = await qortalRequest({ action: "GET_USER_ACCOUNT" });
      if (accountData?.address) {
        const namesData = await qortalRequest({ action: 'GET_ACCOUNT_NAMES', address: accountData.address });
        const userName = namesData?.[0]?.name || `Kasutaja ${accountData.address.substring(0, 6)}...`;
        const userToSet = { name: userName, address: accountData.address, publicKey: accountData.publicKey };
        
        setIsLoggedIn(true);
        setCurrentUser(userToSet);
        alert(`Tere, ${userToSet.name}!`);
        return userToSet; // Tagastame eduka sisselogimise korral kasutaja andmed
      } else {
        throw new Error("Kasutaja andmeid ei saadud.");
      }
    } catch (error) {
      alert(`Sisselogimine ebaõnnestus: ${error.message}`);
      return null; // Tagastame null, kui ebaõnnestub
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    alert("Oled välja logitud.");
  };

  const value = { isLoggedIn, currentUser, isAuthLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};