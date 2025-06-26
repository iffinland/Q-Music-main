// src/pages/HomePage.jsx
import React from 'react';
import MusicList from '../components/MusicList';

// Võtame vastu onSongSelect funktsiooni ja songs andmed App.jsx-ist
function HomePage({ songs, onSongSelect }) {
  return (
    <div>
      <section className="latest-uploads">
        <h2>Viimati Üleslaetud Audio</h2>
        {/* Edastame songs prop'i MusicListile nime all songsData (või sama nimega songs, kui soovid) */}
        {/* Ja onSongSelect prop'i */}
        <MusicList songsData={songs} onSongSelect={onSongSelect} />
      </section>

      <section className="latest-playlists" style={{ marginTop: '2rem' }}>
        <h2>Viimati Loodud Playlistid</h2>
        <p>Playlistide sektsioon (tuleb hiljem juurde)...</p>
      </section>
    </div>
  );
}

export default HomePage;