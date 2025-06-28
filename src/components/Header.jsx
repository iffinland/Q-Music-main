// src/components/Header.jsx - SAMM 3
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox'; // Lisa import

function Header({ isLoggedIn, currentUser, onLoginClick, onLogoutClick }) {
  return (
    <header className="app-header">
      <div className="header-main-row">
        <h1><Link to="/" className="logo-link">Q-Music</Link></h1>
        <nav className="header-auth-nav">
          {isLoggedIn && currentUser ? (
            <button onClick={onLogoutClick} className="login-button">Välju ({currentUser.name})</button>
          ) : (
            <button onClick={onLoginClick} className="login-button">Logi sisse Qortaliga</button>
          )}
        </nav>
      </div>
      
      {/* LISAME OTSINGUKASTI TAGASI */}
      <div className="header-search-row">
        <SearchBox placeholderText="Otsi muusikat..." />
      </div>

      {isLoggedIn && (
        <div className="header-action-buttons">
          <Link to="/add-music" className="action-button">Lisa UUT muusikat</Link>
          <Link to="/create-playlist" className="action-button">Lisa UUS playlist</Link>
        </div>
      )}
    </header>
  );
}

export default Header;