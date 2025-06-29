// src/App.jsx - PARANDATUD Sisselogimisloogikaga
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
import SongDetailPage from './pages/SongDetailPage';

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

  // **** SIIN ON PARANDATUD JA TAASTATUD KOOD ****
  const handleLogin = async () => {
    if (typeof qortalRequest === 'undefined') {
      alert("Qortali API-t ei leitud. Palun ava rakendus Qortali UI kaudu.");
      return;
    }
    try {
      const accountData = await qortalRequest({ action: "GET_USER_ACCOUNT" });
      if (accountData && accountData.address) {
        const namesData = await qortalRequest({ action: 'GET_ACCOUNT_NAMES', address: accountData.address });
        const userName = (namesData && namesData.length > 0) ? namesData[0].name : `Kasutaja ${accountData.address.substring(0, 6)}...`;
        const userToSet = { name: userName, address: accountData.address, publicKey: accountData.publicKey };
        setIsLoggedIn(true);
        setCurrentUser(userToSet);
        alert(`Tere, ${userToSet.name}! Sinu konto on ühendatud.`);
      } else {
        throw new Error("Kasutaja andmeid ei saadud või toiming tühistati.");
      }
    } catch (error) {
      alert(`Sisselogimine ebaõnnestus: ${error.message || "Tundmatu viga"}`);
    }
  };

  const handleNavigateToAction = async (targetPath) => {
    if (isLoggedIn && currentUser) {
      navigate(targetPath);
      return;
    }
    alert("Selle toimingu tegemiseks pead olema sisse logitud. Proovin sind sisse logida...");
    await handleLogin();
  };
  // **** PARANDUS LÕPPEB SIIN ****

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
          <Route path="/song/:songId" element={<SongDetailPage onSongSelect={handleSelectSong} />} />
          <Route path="*" element={<div><h2>404 - Lehte ei leitud</h2><Link to="/">Mine tagasi avalehele</Link></div>} />
        </Routes>
      </main>
      <Player currentSong={selectedSong} />
    </div>
  );
}
export default App;