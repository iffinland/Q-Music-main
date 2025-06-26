// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox'; // Eeldusel, et SearchBox on components kaustas

// Propsid: isLoggedIn, currentUser (nimi kuvamiseks), onLoginLogoutClick, onSearchSubmit, onNavigateToAction
function Header({ isLoggedIn, currentUser, onLoginLogoutClick, onSearchSubmit, onNavigateToAction }) {
  return (
    <header className="app-header">
      <div className="header-main-row"> {/* Rida logole ja sisselogimise nupule */}
        <h1>
          <Link to="/" className="logo-link">Q-Music</Link>
        </h1>
        <nav className="header-auth-nav">
          <button onClick={onLoginLogoutClick} className="login-button">
            {isLoggedIn && currentUser ? `Välju (${currentUser.name})` : 'Logi sisse Qortaliga'}
          </button>
        </nav>
      </div>

      <div className="header-search-row"> {/* Rida otsingukastile */}
        <SearchBox onActualSearch={onSearchSubmit} placeholderText="Otsi muusikat..." />
      </div>

      {/* Tegevusnupud, kuvatakse ainult sisselogitud kasutajale */}
      {isLoggedIn && (
        <div className="header-action-buttons">
          <button onClick={() => onNavigateToAction('/add-music')} className="action-button">
            Lisa UUT muusikat
          </button>
          <button onClick={() => onNavigateToAction('/create-playlist')} className="action-button">
            Lisa UUS playlist
          </button>
          {/* Siia võib lisada ka lingi profiililehele vms, kui see on headeris */}
          {/* <Link to="/profile" className="action-button as-link">Minu Profiil</Link> */}
        </div>
      )}
    </header>
  );
}

export default Header;