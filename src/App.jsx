// src/App.jsx - LIHTSUSTATUD STRUKTUUR
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Impordime oma hooki

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
import SongDetailPage from './pages/SongDetailPage';

// Andmed ja stiilid
import { songs as initialMockSongs } from "./data/mockSongs";
import './App.css';

// Kogu loogika on nüüd ühes App komponendis
function App() {
  const navigate = useNavigate();

  // Olekud, mis EI ole seotud autentimisega
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  
  // Autentimise olekud ja funktsioonid tulevad nüüd otse Contextist
  const { isLoggedIn, currentUser, login, logout } = useAuth();

  useEffect(() => {
    setSongs(initialMockSongs);
  }, []);

  const handleSelectSong = (song) => setSelectedSong(song);

  const handleLogoutAndNavigate = () => {
    logout(); // Kutsub contexti logout funktsiooni
    navigate('/'); // Navigeerib siin
  };
  
  const handleNavigateToAction = async (targetPath) => {
    if (!isLoggedIn) {
      alert("Selle toimingu tegemiseks pead olema sisse logitud.");
      await login(); // Kutsub contexti login funktsiooni
    } else {
      navigate(targetPath);
    }
  };
  
  return (
    <div className="app-container">
      {/* Me anname Headerile otse vajalikud väärtused ja funktsioonid */}
      <Header 
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={login} 
        onLogoutClick={handleLogoutAndNavigate}
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
          <Route path="/song/:songId" element={<SongDetailPage onSongSelect={handleSelectSong} />} />
          <Route path="*" element={<div><h2>404 - Lehte ei leitud</h2><Link to="/">Mine tagasi avalehele</Link></div>} />
        </Routes>
      </main>

      <Player currentSong={selectedSong} />
    </div>
  );
}

export default App;