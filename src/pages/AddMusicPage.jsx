import React from 'react';

function AddMusicPage() {
  return (
    <div>
      <h2>Lisa Uus Muusikapala</h2>
      <form>
        {/* Siia tulevad vormielemendid: faili valik, pealkiri, artist jne. */}
        <div>
          <label htmlFor="title">Pealkiri:</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="artist">Artist:</label>
          <input type="text" id="artist" name="artist" />
        </div>
        <div>
          <label htmlFor="audioFile">Audiofail:</label>
          <input type="file" id="audioFile" name="audioFile" accept="audio/*" />
        </div>
        <button type="submit">Lae Üles</button>
      </form>
    </div>
  );
}

export default AddMusicPage;