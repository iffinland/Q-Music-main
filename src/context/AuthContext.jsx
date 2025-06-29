// src/context/AuthContext.jsx - EEMALDATUD ROUTERI SÕLTUVUS
import React, { createContext, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; // **** EEMALDAME SELLE IMPORDI ****

/* global qortalRequest */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // const navigate = useNavigate(); // **** EEMALDAME SELLE HOOKI ****

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = async () => {
    // ... (see funktsioon jääb samaks) ...
    if (typeof qortalRequest === 'undefined') { alert("Qortali API-t ei leitud."); return; }
    try {
      const accountData = await qortalRequest({ action: "GET_USER_ACCOUNT" });
      if (accountData && accountData.address) {
        const namesData = await qortalRequest({ action: 'GET_NAMES_BY_ADDRESS', address: accountData.address });
        const userName = (namesData && namesData.length > 0) ? namesData[0].name : `Kasutaja ${accountData.address.substring(0, 6)}...`;
        const userToSet = { name: userName, address: accountData.address, publicKey: accountData.publicKey };
        setIsLoggedIn(true);
        setCurrentUser(userToSet);
        alert(`Tere, ${userToSet.name}!`);
      } else { throw new Error("Kasutaja andmeid ei saadud."); }
    } catch (error) { alert(`Sisselogimine ebaõnnestus: ${error.message}`); }
  };

  // **** OLULINE MUUDATUS SIIN ****
  // handleLogout ei kasuta enam navigate'i. See ainult muudab olekut.
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    alert("Oled välja logitud.");
    // Navigeerimise eest hoolitseb nüüd komponent, mis logout'i kutsub.
  };

  const value = {
    isLoggedIn,
    currentUser,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};