// src/components/Header.jsx - LISATUD AJUTINE TESTLINK LAULU LEHELE
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';

function Header({ isLoggedIn, currentUser, onLoginClick, onLogoutClick, onSearchSubmit, onNavigateToAction }) {
  return (
    <header className="app-header">
      <div className="header-main-row">
        <h1><Link to="/" className="logo-link">Q-Music</Link></h1>
        <nav>
          <Link to="/songs" style={{color: 'white', marginRight: '1rem'}}>Sirvi Lugusid</Link>
          <Link to="/playlists" style={{color: 'white', marginRight: '1rem'}}>Sirvi Playliste</Link>
          {/* **** AJUTINE TESTLINK **** */}
          <Link to="/song/song-1" style={{color: 'yellow', marginRight: '1rem'}}>Testi Laulu</Link>
        </nav>
        <nav className="header-auth-nav">
          {/* ... sisselogimise nupud ... */}
        </nav>
      </div>
      {/* ... ülejäänud headeri sisu ... */}
    </header>
  );
}
export default Header;