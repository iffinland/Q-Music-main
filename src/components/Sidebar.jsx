// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// See komponent võtab vastu sisselogimise staatuse ja kasutaja info
function Sidebar({ isLoggedIn, currentUser }) {
  // AJUTINE STATISTIKA OBJEKT
  const stats = {
    songs: 123, // Näidisarvud
    playlists: 15,
    publishers: 7
  };

  return (
    <aside className="sidebar">
      <section className="stats-section">
        <h4>Statistika</h4>
        <p>Songs: {stats.songs}</p>
        <p>Playlists: {stats.playlists}</p>
        <p>Publishers: {stats.publishers}</p>
      </section>

      {/* Kuvame selle bloki ainult siis, kui kasutaja on sisse logitud */}
      {isLoggedIn && currentUser && (
        <section className="user-section">
          <div className="user-avatar">
            <img src={`https://via.placeholder.com/80/cccccc/000000?text=${currentUser.name.substring(0, 1)}`} alt="User Avatar" />
          </div>
          <p className="user-name">{currentUser.name}</p>
          {/* Tulevikus võiks siin olla link profiililehele */}
        </section>
      )}

      {/* Tulevane sisu */}
      <section className="future-content">
        <p><em>(Siia tuleb hiljem muud põnevat...)</em></p>
      </section>
    </aside>
  );
}

export default Sidebar;