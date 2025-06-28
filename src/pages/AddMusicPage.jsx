// src/pages/AddMusicPage.jsx - Lisatud logimine API vastuse jaoks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Eeldame, et qortalRequest on globaalselt kättesaadav
/* global qortalRequest */

function AddMusicPage({ currentUser }) {
  const navigate = useNavigate();

  // Olekud vormiväljadele
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kontrollid
    if (!title || !artist || !selectedFile) {
      alert('Palun täida kõik väljad ja vali fail.');
      return;
    }
    if (!currentUser || !currentUser.name) {
      alert('Sisselogimisviga! Kasutaja nime ei leitud. Proovi uuesti sisse logida.');
      return;
    }
    if (typeof qortalRequest === 'undefined') {
      alert("Qortali API-t ei leitud. Palun ava rakendus Qortali UI kaudu.");
      return;
    }

    setIsUploading(true);

    try {
      // Loome unikaalse identifikaatori
      const safeTitle = title.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
      const safeArtist = artist.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
      const identifier = `qmusic-${safeArtist}-${safeTitle}-${Date.now()}`;

      const requestObject = {
        action: "PUBLISH_QDN_RESOURCE",
        name: currentUser.name,
        service: "AUDIO",
        identifier: identifier,
        title: title,
        description: `Lugu "${title}" esitajalt ${artist}.`,
        file: selectedFile,
      };

      console.log('Saadan Qortalisse järgmise päringu:', requestObject);
      
      // **** PÄRIS API KUTSE ****
      const result = await qortalRequest(requestObject);

      // **** OLULINE LOGIMINE ****
      // See rida näitab meile brauseri konsoolis täpselt, mida API tagastas.
      console.log("Qortal API tagastas (result):", result);
      // **** **** **** **** ****

      // Kontrollime, kas vastus oli rangelt 'true'
      if (result === true) {
         alert('Lugu on edukalt avaldatud Qortalisse! Sünkroniseerimine võrgus võib võtta aega.');
         navigate('/');
      } else {
         // Kui vastus ei olnud 'true', siis viskame vea koos tagastatud väärtusega
         throw new Error(`API ei tagastanud edukat vastust (true), vaid: ${JSON.stringify(result)}`);
      }

    } catch (error) {
      console.error('Avaldamise viga:', error);
      alert(`Avaldamine ebaõnnestus: ${error.message || 'Palun proovi uuesti.'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="add-music-page">
      <h2>Lae Üles Uus Lugu</h2>
      <p>Avaldaja: <strong>{currentUser ? currentUser.name : 'Pole sisse logitud'}</strong></p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Loo pealkiri</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="artist">Esitaja</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            disabled={isUploading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="audioFile">Vali audiofail (nt .mp3)</label>
          <input
            type="file"
            id="audioFile"
            onChange={handleFileChange}
            accept="audio/*"
            disabled={isUploading}
            required
          />
          {selectedFile && <p>Valitud fail: {selectedFile.name}</p>}
        </div>
        <button type="submit" disabled={!currentUser || isUploading}>
          {isUploading ? 'Avaldan...' : 'Avalda Qortalisse'}
        </button>
      </form>
    </div>
  );
}

export default AddMusicPage;