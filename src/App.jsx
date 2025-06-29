// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Header from './components/Header';
import Player from './components/Player';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
// ... ülejäänud lehtede impordid ...

import { songs as initialMockSongs } from "./data/mockSongs";
import './App.css';

function App() {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, login, logout } = useAuth();
  
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => { setSongs(initialMockSongs); }, []);

  const handleSelectSong = (song) => setSelectedSong(song);

  const handleLogoutAndNavigate = () => {
    logout();
    navigate('/');
  };
  
  const handleNavigateToAction = async (targetPath) => {
    if (isLoggedIn) {
      navigate(targetPath);
    } else {
      alert("Selleks pead olema sisse logitud. Proovin sind sisse logida...");
      const user = await login(); // Ootame, kuni login funktsioon lõpetab
      if (user) {
        // Kui sisselogimine õnnestus, võime kasutaja kohe edasi suunata
        navigate(targetPath);
      }
    }
  };
  
  return (
    <div className="app-container">
      <Header onLogoutClick={handleLogoutAndNavigate} onNavigateToAction={handleNavigateToAction} />
      <div className="content-wrapper">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
            <Route path="/add-music" element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" />} />
            <Route path="/create-playlist" element={isLoggedIn ? <CreatePlaylistPage /> : <Navigate to="/" />} />
            {/* ... teised route'id ... */}
          </Routes>
        </main>
        <Sidebar />
      </div>
      <Player currentSong={selectedSong} />
    </div>
  );
}
export default App;