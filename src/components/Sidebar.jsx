// src/components/Sidebar.jsx - KASUTAB useAuth HOOKI
import React from 'react';
import { useAuth } from '../context/AuthContext'; // **** UUS IMPORT ****

// Komponent ei vaja enam propse
function Sidebar() {
  // Küsime vajalikud väärtused otse contextist
  const { isLoggedIn, currentUser } = useAuth();

  const stats = { /* ... */ };

  return (
    <aside className="sidebar">
      <section className="stats-section">
        {/* ... statistika ... */}
      </section>

      {isLoggedIn && currentUser && (
        <section className="user-section">
          <div className="user-avatar">
            <img src={`https://via.placeholder.com/80/cccccc/000000?text=${currentUser.name.substring(0, 1)}`} alt="User Avatar" />
          </div>
          <p className="user-name">{currentUser.name}</p>
        </section>
      )}
      {/* ... ülejäänud sisu ... */}
    </aside>
  );
}
export default Sidebar;