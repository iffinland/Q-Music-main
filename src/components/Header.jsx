// src/components/Header.jsx - LINGID TAASTATUD
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { useAuth } from '../context/AuthContext';

// See Header saab ainult App-spetsiifilise 'onLogoutClick' funktsiooni,
// mis tegeleb ka navigeerimisega.
function Header({ onLogoutClick }) {
  const navigate = useNavigate();

  // Autentimisinfo ja login funktsioon tulevad otse Contextist
  const { isLoggedIn, currentUser, login, isAuthLoading } = useAuth();
  
  // See handler on nüüd Headeri sees, kuna ta kasutab siin olevat navigate'i
  const handleNavigateToAction = async (targetPath) => {
    if (isLoggedIn) {
      navigate(targetPath);
    } else {
      alert("Selleks pead olema sisse logitud.");
      await login(); // Ootame sisselogimiskatse ära
    }
  };

  return (
    <header className="app-header">
      <div className="header-main-row">
        <h1><Link to="/" className="logo-link">Q-Music</Link></h1>
        
        {/* **** LINGID ON TAGASI SIIN **** */}
        <nav>
          <Link to="/songs" className="header-link">Sirvi Lugusid</Link>
          <Link to="/playlists" className="header-link">Sirvi Playliste</Link>
          <Link to="/song/song-1" className="header-link-special">Testi Laulu</Link>
        </nav>
        
        <nav className="header-auth-nav">
          {isLoggedIn && currentUser ? (
            <button onClick={onLogoutClick} className="login-button">
              Välju ({currentUser.name})
            </button>
          ) : (
            <button onClick={login} disabled={isAuthLoading} className="login-button">
              {isAuthLoading ? 'Loggin sisse...' : 'Logi sisse Qortaliga'}
            </button>
          )}
        </nav>
      </div>
      <div className="header-search-row">
        {/* SearchBoxi props 'onActualSearch' pole enam vaja, sest SearchBox ise navigeerib */}
        <SearchBox placeholderText="Otsi muusikat..." />
      </div>
      {isLoggedIn && (
        <div className="header-action-buttons">
          <button onClick={() => handleNavigateToAction('/add-music')} className="action-button">
            Lisa UUT muusikat
          </button>
          <button onClick={() => handleNavigateToAction('/create-playlist')} className="action-button">
            Lisa UUS playlist
          </button>
        </div>
      )}
    </header>
  );
}
export default Header;