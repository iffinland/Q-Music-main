// src/App.jsx - Täielik UI vundament
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
// ... ülejäänud impordid ...

function App() { return ( <HashRouter> <AuthProvider> <AppContent /> </AuthProvider> </HashRouter> ); }

function AppContent() {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, login, logout } = useAuth();
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => { setSongs(initialMockSongs); }, []);
  const handleSelectSong = (song) => setSelectedSong(song);

  const actualSearchHandler = (searchTerm) => { if (searchTerm.trim()) navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`); };
  const handleLogoutAndNavigate = () => { logout(); navigate('/'); };
  
  const handleNavigateToAction = async (targetPath) => {
    if (isLoggedIn) {
      navigate(targetPath);
    } else {
      alert("Selle toimingu tegemiseks pead olema sisse logitud.");
      await login();
    }
  };
  
  return (
    <div className="app-container">
      <Header 
        onLogoutClick={handleLogoutAndNavigate}
        onNavigateToAction={handleNavigateToAction}
        // Lisame otsingu-handler'i tagasi
        onSearchSubmit={actualSearchHandler}
      />
      <div className="content-wrapper">
        <main className="main-content">
          <Routes>
            {/* ... kõik route'id on siin ... */}
            <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
            <Route path="/add-music" element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" replace />} />
            <Route path="/create-playlist" element={isLoggedIn ? <CreatePlaylistPage /> : <Navigate to="/" replace />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/songs" element={<BrowseSongsPage songs={songs} onSongSelect={handleSelectSong} />} />
            <Route path="/playlists" element={<BrowsePlaylistsPage />} />
            <Route path="/playlist/:playlistId" element={<PlaylistDetailPage onSongSelect={handleSelectSong} />} />
            <Route path="/song/:songId" element={<SongDetailPage onSongSelect={handleSelectSong} />} />
            <Route path="*" element={<div><h2>404</h2></div>} />
          </Routes>
        </main>
        <Sidebar />
      </div>
      <Player currentSong={selectedSong} />
    </div>
  );
}
export default App;