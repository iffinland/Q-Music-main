// src/components/MusicList.jsx
import React from 'react';
import SongItem from './SongItem'; // SongItem jääb samaks

// Võtame props objektist välja songsData ja onSongSelect
// Kui onSongSelect ei ole alati vajalik, võid sellele vaikimisi väärtuse anda või kontrollida enne kutsumist
function MusicList({ songsData, onSongSelect }) {
  // Kontrollime, kas songsData on olemas ja kas see on massiiv ning kas selles on elemente
  if (!songsData || !Array.isArray(songsData) || songsData.length === 0) {
    return <p>Laule ei leitud.</p>; // Või null, kui sa ei taha midagi kuvada
  }

  return (
    <section className="music-list">
      {/* Pealkiri "Saadaolevad Lood" oli siin enne, aga võib-olla on parem, kui
          vanemkomponent (nt HomePage) määrab pealkirja, kui see varieerub.
          Kui see on alati sama, võib selle siia jätta.
      <h2>Saadaolevad Lood</h2>
      */}
      {songsData.map(song => (
        <SongItem
          key={song.id}
          song={song}
          // Veendu, et onSongSelect on funktsioon enne selle kutsumist,
          // või et see on alati edasi antud, kui SongItem seda ootab.
          onSelect={() => {
            if (typeof onSongSelect === 'function') {
              onSongSelect(song);
            }
          }}
        />
      ))}
    </section>
  );
}

export default MusicList;