// src/App.jsx - AINULT Sisselogimise parandus
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

// Komponendid ja lehed
import Header from './components/Header';
import Player from './components/Player';
import HomePage from './pages/HomePage';
import AddMusicPage from './pages/AddMusicPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import SearchResultsPage from './pages/SearchResultsPage';

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

  useEffect(() => {
    setSongs(initialMockSongs);
  }, []);

  const handleSelectSong = (song) => setSelectedSong(song);
  const actualSearchHandler = (searchTerm) => { if (searchTerm.trim()) navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`); };
  const handleLogout = () => { setIsLoggedIn(false); setCurrentUser(null); alert("Oled välja logitud."); navigate('/'); };

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
        alert(`Tere, ${userToSet.name}!`);
      } else {
        throw new Error("Kasutaja andmeid ei saadud.");
      }
    } catch (error) {
      alert(`Sisselogimine ebaõnnestus: ${error.message}`);
    }
  };

  const handleNavigateToAction = async (targetPath) => {
    if (isLoggedIn && currentUser) {
      navigate(targetPath);
      return;
    }
    alert("Selle toimingu tegemiseks pead olema sisse logitud.");
    await handleLogin();
  };

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
          <Route path="/songs" element={<BrowseSongsPage onSongSelect={handleSelectSong} />} />
          <Route path="*" element={<div><h2>404 - Lehte ei leitud</h2><Link to="/">Mine tagasi avalehele</Link></div>} />
        </Routes>
      </main>
      <Player currentSong={selectedSong} />
    </div>
  );
}
export default App;