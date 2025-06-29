// src/App.jsx - LISATUD LAULU DETAILVAATE ROUTE
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

// Komponendid ja lehed
import Header from './components/Header';
import Player from './components/Player';
import HomePage from './pages/HomePage';
import AddMusicPage from './pages/AddMusicPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import SearchResultsPage from './pages/SearchResultsPage';
import BrowseSongsPage from './pages/BrowseSongsPage';
import BrowsePlaylistsPage from './pages/BrowsePlaylistsPage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import SongDetailPage from './pages/SongDetailPage'; // Uus import

// Andmed ja stiilid
import { songs as initialMockSongs } from "./data/mockSongs";
import './App.css';

/* global qortalRequest */

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => { setSongs(initialMockSongs); }, []);

  const handleSelectSong = (song) => setSelectedSong(song);
  const actualSearchHandler = (searchTerm) => { if (searchTerm.trim()) navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`); };
  const handleLogout = () => { setIsLoggedIn(false); setCurrentUser(null); alert("Oled välja logitud."); navigate('/'); };
  const handleLogin = async () => { /* Sinu töötav handleLogin kood siin */ };
  const handleNavigateToAction = async (targetPath) => { /* Sinu töötav handleNavigateToAction kood siin */ };

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={handleLogin}
        onLogoutClick={handleLogout}
        onSearchSubmit={actualSearchHandler}
        onNavigateToAction={handleNavigateToAction}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
          <Route path="/add-music" element={isLoggedIn ? <AddMusicPage currentUser={currentUser} /> : <Navigate to="/" replace />} />
          <Route path="/create-playlist" element={isLoggedIn ? <CreatePlaylistPage currentUser={currentUser} /> : <Navigate to="/" replace />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/songs" element={<BrowseSongsPage songs={songs} onSongSelect={handleSelectSong} />} />
          <Route path="/playlists" element={<BrowsePlaylistsPage />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetailPage onSongSelect={handleSelectSong} />} />
          
          {/* **** UUS DÜNAAMILINE ROUTE LAULULE **** */}
          <Route path="/song/:songId" element={<SongDetailPage onSongSelect={handleSelectSong} />} />

          <Route path="*" element={<div><h2>404 - Lehte ei leitud</h2><Link to="/">Mine tagasi avalehele</Link></div>} />
        </Routes>
      </main>
      <Player currentSong={selectedSong} />
    </div>
  );
}
export default App;