// src/components/Player.jsx
import React from 'react';

// Võta vastu currentSong prop
function Player({ currentSong }) {
  return (
    <div className="player-bar">
      {currentSong ? (
        <div>
          <p>Mängib praegu (info Playerist):</p>
          <p><strong>{currentSong.title}</strong> - {currentSong.artist}</p>
        </div>
      ) : (
        <p>Vali mõni lugu kuulamiseks.</p>
      )}
      {/* Hilisemad mängija nupud jne */}
    </div>
  );
}

export default Player;