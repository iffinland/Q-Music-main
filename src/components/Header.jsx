// src/components/Header.jsx - PARANDATUD
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { useAuth } from '../context/AuthContext';

// Header saab onLogoutClick funktsiooni nüüd AppContentist
function Header({ onLogoutClick }) {
  // Võtame contextist ainult need asjad, mida me siin otse vajame
  const { isLoggedIn, currentUser, login } = useAuth();

  // Otsingu ja tegevuste jaoks on meil vaja ka navigate'i, aga need on App.jsx-is
  // See on märk, et ka need handlerid peaksid tulema propsidena.
  // Praegu jätame need nii, nagu nad on, ja parandame ainult logout'i.

  return (
    <header className="app-header">
      <div className="header-main-row">
        <h1><Link to="/" className="logo-link">Q-Music</Link></h1>
        <nav>
          <Link to="/songs" style={{color: 'white', marginRight: '1rem'}}>Sirvi Lugusid</Link>
          <Link to="/playlists" style={{color: 'white', marginRight: '1rem'}}>Sirvi Playliste</Link>
        </nav>
        <nav className="header-auth-nav">
          {isLoggedIn && currentUser ? (
            // **** OLULINE PARANDUS: Kasutame siin App.jsx-ist saadud onLogoutClick funktsiooni ****
            <button onClick={onLogoutClick} className="login-button">Välju ({currentUser.name})</button>
          ) : (
            // Login funktsioon tuleb endiselt otse contextist, see on OK
            <button onClick={login} className="login-button">Logi sisse Qortaliga</button>
          )}
        </nav>
      </div>
      <div className="header-search-row">
        {/* SearchBox kasutab ise useNavigate'i, see on korras */}
        <SearchBox placeholderText="Otsi muusikat..." />
      </div>
      {isLoggedIn && (
        <div className="header-action-buttons">
          {/* Need lingid töötavad, sest nad ei vaja onClick handlerit App.jsx-ist */}
          <Link to="/add-music" className="action-button">Lisa UUT muusikat</Link>
          <Link to="/create-playlist" className="action-button">Lisa UUS playlist</Link>
        </div>
      )}
    </header>
  );
}

export default Header;