// src/components/Header.jsx - KASUTAB NÜÜD App.jsx-ist TULEVAT LOGOUT FUNKTSIOONI
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { useAuth } from '../context/AuthContext';

// Header saab onLogoutClick funktsiooni nüüd AppContentist
function Header({ onLogoutClick }) {
  const { isLoggedIn, currentUser, login } = useAuth();
  // ... (otsingu ja tegevuste loogika jääb samaks)

  return (
    <header className="app-header">
      <div className="header-main-row">
        {/* ... logo ja lingid ... */}
        <nav className="header-auth-nav">
          {isLoggedIn && currentUser ? (
            // Kasutame siin AppContentist saadud funktsiooni
            <button onClick={onLogoutClick} className="login-button">Välju ({currentUser.name})</button>
          ) : (
            // Login funktsioon tuleb endiselt otse contextist
            <button onClick={login} className="login-button">Logi sisse Qortaliga</button>
          )}
        </nav>
      </div>
      {/* ... ülejäänud headeri sisu ... */}
    </header>
  );
}
export default Header;