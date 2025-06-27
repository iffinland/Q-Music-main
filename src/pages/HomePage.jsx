// src/pages/HomePage.jsx
import React from 'react';
import MusicList from '../components/MusicList'; // Me kasutame seda uues stiilis
// import PlaylistGrid from '../components/PlaylistGrid'; // Tulevikus playlistide jaoks

function HomePage({ songs, onSongSelect }) {
  // Loome ajutised mock-andmed ka playlistide jaoks
  const mockPlaylists = [
    { id: 'pl1', name: 'Suve Hitis', songCount: 12 },
    { id: 'pl2', name: 'Treni Muusika', songCount: 25 },
    { id: 'pl3', name: 'Rahulikud Õhtud', songCount: 30 },
    { id: 'pl4', name: 'Eesti Klassika', songCount: 50 },
    { id: 'pl5', name: 'Rock on lahe', songCount: 18 },
    { id: 'pl6', name: 'Uus ja huvitav', songCount: 22 },
  ];

  return (
    <div className="homepage">
      <section className="horizontal-scroll-section">
        <h2>Viimati Lisatud</h2>
        {/* Anname MusicListile spetsiaalse klassinime horisontaalse stiili jaoks */}
        <MusicList songsData={songs} onSongSelect={onSongSelect} listClassName="horizontal-music-list" />
      </section>

      <section className="horizontal-scroll-section">
        <h2>Populaarsed Playlistid</h2>
        <div className="horizontal-playlist-grid"> {/* Uus konteiner playlistidele */}
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