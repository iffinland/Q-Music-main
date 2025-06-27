// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { songs as initialMockSongs } from "./data/mockSongs"; // Mock andmed

// Komponentide impordid
import Header from './components/Header';
import Player from './components/Player';

// Lehtede impordid
import HomePage from './pages/HomePage';
import AddMusicPage from './pages/AddMusicPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import SearchResultsPage from './pages/SearchResultsPage';

// CSS impordid
import './App.css';

// Peamine App komponent, mis renderdab AppContent'i
function App() {
  return (<AppContent />);
}

// AppContent komponent, kus on enamus rakenduse loogikast ja JSX-ist
function AppContent() {
  const navigate = useNavigate();

  // Olekumuutujad
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [songs, setSongs] = useState([]);

  // Efekt laulude laadimiseks
  useEffect(() => {
    setSongs(initialMockSongs);
  }, []);

  // Efekt, mis proovib kasutajat automaatselt tuvastada rakenduse laadimisel
  useEffect(() => {
    // See funktsioon kutsutakse välja, kui rakendus esimest korda laeb
    const autoLogin = async () => {
      // Siia võiks panna tulevikus automaatse sisselogimise katse,
      // aga praegu on parem, kui see toimub nupuvajutusel.
      console.log("Rakendus laetud. Kasutaja pole autenditud.");
    };
    autoLogin();
  }, []); // Tühi massiiv tähendab, et see jookseb ainult korra

  // ----- HANDLER-FUNKTSIOONID -----

  // See on UUS ja PEAMINE funktsioon autentimiseks
  const loginOrGetUserData = async () => {
    // Esiteks kontrollime, kas qortalRequest funktsioon on olemas
    // Kuna me ei impordi seda, siis eeldame, et see on globaalsel window objektil
    if (typeof qortalRequest === 'undefined') {
      alert("Qortali API-t ei leitud. Palun veendu, et sinu Qortali tarkvara töötab ja oled keskkonnas, kus API on kättesaadav.");
      return null; // Tagastame null, et anda teada ebaõnnestumisest
    }

    try {
      console.log("Proovin käivitada qortalRequest({ action: 'GET_USER_ACCOUNT' })...");
      // See peaks käivitama Qortali popupi, kui luba on vaja
      const userData = await qortalRequest({ action: "GET_USER_ACCOUNT" });
      console.log("GET_USER_ACCOUNT vastus:", userData);

      if (userData && userData.address) {
        setIsLoggedIn(true);
        // Salvestame aadressi ja publicKey. Nime peame veel leidma.
        const user = {
          address: userData.address,
          publicKey: userData.publicKey,
          name: "Laen nime..." // Ajutine nimi
        };
        setCurrentUser(user);
        alert(`Autentimine õnnestus! Aadress: ${userData.address}`);

        // TODO: Tee lisapäring, et saada nime aadressi alusel, kui API seda võimaldab
        // Näiteks:
        // const namesData = await qortalRequest({ action: 'GET_ACCOUNT_NAMES', address: userData.address });
        // if (namesData && namesData.length > 0) {
        //   setCurrentUser({ ...user, name: namesData[0].name });
        // } else {
        //   setCurrentUser({ ...user, name: "Nimi puudub" });
        // }

        return user; // Tagastame kasutaja andmed edasiseks kasutamiseks
      } else {
        throw new Error("Kasutaja andmeid ei saadud või aadress puudub vastuses.");
      }
    } catch (error) {
      console.error("Qortal API viga (GET_USER_ACCOUNT):", error);
      setIsLoggedIn(false);
      setCurrentUser(null);
      alert("Qortaliga autentimine ebaõnnestus. Kasutaja keeldus või tekkis viga. Palun veendu, et oled Qortalis sisse logitud ja andnud loa.");
      return null; // Tagastame null, et anda teada ebaõnnestumisest
    }
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
  };

  const actualSearchHandler = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Nüüd kasutab see uut loginOrGetUserData funktsiooni
  const handleToggleLoginLogout = async () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      alert("Oled välja logitud.");
    } else {
      await loginOrGetUserData(); // Kutsu peamist autentimisfunktsiooni
    }
  };

const handleNavigateToAction = async (targetPath) => {
  // 1. Kontrolli, kas kasutaja on juba rakenduse mõistes sisse logitud.
  if (isLoggedIn && currentUser) {
    console.log(`Kasutaja ${currentUser.name || currentUser.address} on juba sisse logitud. Navigeerin -> ${targetPath}`);
    navigate(targetPath);
    return;
  }

  // 2. Kui kasutaja POLE sisse logitud, proovi tema andmeid pärida kasutades qortalRequest.
  console.log("Proovin sisse logida kasutades qortalRequest...");

  try {
    //
    // **** SEE ON NÜÜD KORREKTNE KOOD, MIS PÕHINEB SINU LEIUL ****
    //
    const userData = await qortalRequest({
      action: "GET_USER_ACCOUNT",
    });

    // Kontrollime, kas saime vastuses kasutaja andmed
    if (userData && userData.address) {
      console.log(`Autentimine õnnestus! Aadress: ${userData.address}`);

      // Uuendame rakenduse olekut
      setIsLoggedIn(true);
      // Salvestame aadressi ja publicKey. Nime me siit ei saa, aga see on OK.
      // Nime saame hiljem eraldi küsida, kui vaja.
      setCurrentUser({
        address: userData.address,
        publicKey: userData.publicKey,
        name: userData.name || `Kasutaja ${userData.address.substring(0, 6)}...` // Ajutine nimi
      });

      alert(`Tere! Sinu Qortali konto (${userData.address.substring(0, 8)}...) on ühendatud.`);

      // Nüüd navigeerime soovitud lehele
      navigate(targetPath);

    } else {
      // qortalRequest ei tagastanud oodatud andmeid.
      throw new Error("qortalRequest ei tagastanud kasutaja andmeid.");
    }

  } catch (error) {
    // See blokk käivitub, kui qortalRequest viskab vea.
    // See juhtub tõenäoliselt siis, kui kasutaja keeldub popupis luba andmast,
    // või kui Qortali tarkvara ei tööta.
    console.error("Qortali autentimise viga:", error);
    alert(
      "Sisselogimine ebaõnnestus või tühistati.\n\n" +
      "Palun veendu, et sinu Qortali tarkvara töötab ja annad rakendusele loa oma konto kasutamiseks."
    );
  }
};


  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginLogoutClick={handleToggleLoginLogout}
        onSearchSubmit={actualSearchHandler}
        onNavigateToAction={handleNavigateToAction}
      />
      <div className="content-wrapper">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route
              path="/add-music"
              element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/create-playlist"
              element={isLoggedIn ? <CreatePlaylistPage /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<div><h2>404 Lehte ei leitud</h2><Link to="/">Mine avalehele</Link></div>} />
          </Routes>
        </main>
      </div>
      <Player currentSong={selectedSong} />
    </div>
  );
}

export default App;