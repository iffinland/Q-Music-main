// src/components/Sidebar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const { isLoggedIn, currentUser, stats } = useAuth();
  return (
    <aside className="sidebar">
      <section className="stats-section">
        <h4>Statistika</h4>
        <p>Songs: {stats.songs}</p>
        <p>Playlists: {stats.playlists}</p>
        <p>Publishers: {stats.publishers}</p>
      </section>
      {isLoggedIn && currentUser && (
        <section className="user-section">
          {/* ... kasutaja info ... */}
        </section>
      )}
    </aside>
  );
}
export default Sidebar;