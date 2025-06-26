// src/pages/CreatePlaylistPage.jsx
import React from 'react';

function CreatePlaylistPage() {
  return (
    <div>
      <h2>Loo UUS playlist</h2>
      <form>
        {/* Siia tulevad vormielemendid: Profiili pilt, Üleslaetud lugude kogus numbrites ja ka loodud playlistid, hiljem muud statistikat jne. */}
        <div>
          <label htmlFor="PlaylistTitle">Playlist Name:</label>
          <input type="text" id="playlisttitle" name="PlaylistTitle" />
        </div>
        <div>
          <label htmlFor="PlaylistDescriptions">Playlist Descriptions:</label>
          <input type="text" id="playlistdescriptions" name="PlaylistDescriptions" />
        </div>
        <div>
          <label htmlFor="PlaylistImage">Playlist image:</label>
          <input type="file" id="playlistimage" name="PlaylistImage" accept="image/*" />
        </div>
        <button type="submit">Create NEW playlist</button>
      </form>
    </div>
  );
}

export default CreatePlaylistPage;