// src/App.jsx - KASUTAME Sidebar KOMPONENTI
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

// Komponendid ja lehed
import Header from './components/Header';
import Player from './components/Player';
import Sidebar from './components/Sidebar'; // **** UUS IMPORT ****
import HomePage from './pages/HomePage';
// ... ülejäänud lehtede impordid ...

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
  // ... (kõik sinu olemasolevad olekud ja handlerid jäävad siia) ...
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
      
      <div className="content-wrapper">
        <main className="main-content">
          <Routes>
            {/* ... (kõik sinu route'id jäävad siia) ... */}
          </Routes>
        </main>

        {/* **** KASUTAME NÜÜD Sidebar KOMPONENTI **** */}
        {/* Anname talle vajalikud propsid */}
        <Sidebar isLoggedIn={isLoggedIn} currentUser={currentUser} />
      </div>

      <Player currentSong={selectedSong} />
    </div>
  );
}
export default App;