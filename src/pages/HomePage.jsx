// src/pages/HomePage.jsx
import React from 'react';
import MusicList from '../components/MusicList';

// Anname propsidele vaikimisi väärtused: songs saab tühja massiivi, onSongSelect tühja funktsiooni
function HomePage({ songs = [], onSongSelect = () => {} }) {
  // Loome siia ka mock-playlistid, et see komponent ei sõltuks propsidest
  const mockPlaylists = [
    { id: 'pl1', name: 'Suve Hitis', songCount: 12 },
    { id: 'pl2', name: 'Treni Muusika', songCount: 25 },
    // ... lisa veel, kui soovid
  ];

  return (
    <div className="homepage">
      <section className="horizontal-scroll-section">
        <h2>Viimati Lisatud</h2>
        {/* Anname MusicListile samuti andmed edasi */}
        <MusicList songsData={songs} onSongSelect={onSongSelect} listClassName="horizontal-music-list" />
      </section>

      <section className="horizontal-scroll-section">
        <h2>Populaarsed Playlistid</h2>
        <div className="horizontal-playlist-grid">
          {mockPlaylists.map(playlist => (
            <div key={playlist.id} className="playlist-card">
              <h4>{playlist.name}</h4>
              <p>{playlist.songCount} laulu</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default HomePage;