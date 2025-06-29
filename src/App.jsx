// src/App.jsx - UUENDATUD LOGOUT KÄSITLEMISEGA
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Komponendid ja lehed
import Header from './components/Header';
// ... ülejäänud impordid ...

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </HashRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  
  const { isLoggedIn, currentUser, logout } = useAuth(); // Küsime logout funktsiooni contextist

  useEffect(() => { setSongs(initialMockSongs); }, []);

  const handleSelectSong = (song) => setSelectedSong(song);

  // **** UUS FUNKTSIOON, MIS KUTSUB CONTEXTI LOGOUT'I JA NAVIGEERIB ****
  const handleLogoutAndNavigate = () => {
    logout(); // Kutsub contexti logout funktsiooni, mis muudab olekut
    navigate('/'); // Navigeerib avalehele
  };

  return (
    <div className="app-container">
      {/* Anname Headerile uue logout-käitleja */}
      <Header onLogoutClick={handleLogoutAndNavigate} />
      
      <div className="content-wrapper">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
            <Route path="/add-music" element={isLoggedIn ? <AddMusicPage currentUser={currentUser} /> : <Navigate to="/" replace />} />
            <Route path="/create-playlist" element={isLoggedIn ? <CreatePlaylistPage currentUser={currentUser} /> : <Navigate to="/" replace />} />
            {/* ... ülejäänud route'id ... */}
          </Routes>
        </main>
        <Sidebar />
      </div>
      <Player currentSong={selectedSong} />
    </div>
  );
}
export default App;