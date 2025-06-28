// src/App.jsx - LÕPLIK PARANDUS AUTENTIMISELE
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

// Komponentide impordid
import Header from './components/Header';
import Player from './components/Player';
import SearchBox from './components/SearchBox';

// Lehtede impordid
import HomePage from './pages/HomePage';
import AddMusicPage from './pages/AddMusicPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import SearchResultsPage from './pages/SearchResultsPage';

// Andmete ja stiilide impordid
import { songs as initialMockSongs } from "./data/mockSongs";
import './App.css';

/* global qortalRequest */

// Peamine App komponent, mis seadistab routeri
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// AppContent sisaldab kogu rakenduse loogikat ja on routeri sees
function AppContent() {
  const navigate = useNavigate();

  // Olekumuutujad
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Efektid
  useEffect(() => {
    setSongs(initialMockSongs);
  }, []);

  // Handler-funktsioonid
  const handleSelectSong = (song) => {
    setSelectedSong(song);
  };

  const actualSearchHandler = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    alert("Oled välja logitud.");
    navigate('/');
  };

  const handleLogin = async () => {
    if (typeof qortalRequest === 'undefined') {
      alert("Qortali API-t ei leitud. Palun ava rakendus Qortali UI kaudu.");
      return;
    }

    try {
      console.log("Käivitan GET_USER_ACCOUNT...");
      const accountData = await qortalRequest({ action: "GET_USER_ACCOUNT" });

      if (accountData && accountData.address) {
        console.log("Sain konto aadressi:", accountData.address);

        let userName = `Kasutaja ${accountData.address.substring(0, 6)}...`;
        
        try {
          console.log(`Käivitan GET_ACCOUNT_NAMES aadressiga ${accountData.address}`);
          const namesData = await qortalRequest({
            action: 'GET_ACCOUNT_NAMES',
            address: accountData.address
          });
          
          if (namesData && namesData.length > 0) {
            userName = namesData[0].name;
            console.log("Leidsin nime:", userName);
          } else {
            console.log("Aadressiga seotud nimesid ei leitud.");
          }
        } catch (nameError) {
          console.warn("Kasutaja nime pärimisel tekkis viga:", nameError);
        }

        const userToSet = {
          name: userName,
          address: accountData.address,
          publicKey: accountData.publicKey
        };
        
        setIsLoggedIn(true);
        setCurrentUser(userToSet);
        alert(`Tere, ${userToSet.name}! Sinu konto on ühendatud.`);

      } else {
        throw new Error("Kasutaja andmeid ei saadud või toiming tühistati.");
      }
    } catch (error) {
      console.error("Qortali autentimise viga:", error);
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
  
  // Renderdamine
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
          <Route path="*" element={<div><h2>404 - Lehte ei leitud</h2><Link to="/">Mine tagasi avalehele</Link></div>} />
        </Routes>
      </main>

      <Player currentSong={selectedSong} />
    </div>
  );
}

export default App;