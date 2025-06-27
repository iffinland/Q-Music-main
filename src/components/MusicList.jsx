// src/components/MusicList.jsx
import React from 'react';
import SongItem from './SongItem'; // SongItem jääb samaks

function MusicList({ songsData, onSongSelect, listClassName = "music-list" }) { // Lisa listClassName prop
  // ... (if kontroll) ...
  return (
    // Kasuta siin listClassName prop'i
    <section className={listClassName}>
      {songsData.map(song => (
        <SongItem
          key={song.id}
          song={song}
          onSelect={() => onSongSelect && onSongSelect(song)}
        />
      ))}
    </section>
  );
}
export default MusicList;