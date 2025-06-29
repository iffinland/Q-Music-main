// src/App.jsx - LÕPLIK
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

// Me ei vaja enam AppWrapperit ega AppContentit. App on nüüd peamine komponent.
function App() {
  const navigate = useNavigate();

  // Autentimisinfo tuleb Contextist
  const { isLoggedIn, currentUser, login, logout, isAuthLoading } = useAuth();
  
  // Rakenduse spetsiifiline olek jääb siia
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => { setSongs(initialMockSongs); }, []);

  const handleSelectSong = (song) => setSelectedSong(song);

  const handleLogoutAndNavigate = () => {
    logout(); // Kutsub contexti funktsiooni, mis MUUDAB AINULT OLEKUT
    navigate('/'); // See komponent, olles Routeri sees, VASTUTAB NAVIGEERIMISE EEST
  };

  return (
    <div className="app-container">
      {/* Edastame App-spetsiifilised handlerid propsidena */}
      <Header onLogoutClick={handleLogoutAndNavigate} />
      
      <div className="content-wrapper">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
            <Route path="/add-music" element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" />} />
            <Route path="/create-playlist" element={isLoggedIn ? <CreatePlaylistPage /> : <Navigate to="/" />} />
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