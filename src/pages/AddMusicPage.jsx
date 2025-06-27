// src/pages/AddMusicPage.jsx
import React, { useState } from 'react';

// Siia tuleb päris API saatmise funktsioon
// import { publishAudioTrack } from '../api/qortalApi'; // Hüpoteetiline

function AddMusicPage() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    // Võtame esimese valitud faili
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Väldib vormi tavapärast saatmist ja lehe uuesti laadimist

    // Kontrollime, kas kõik vajalik on olemas
    if (!title || !artist || !selectedFile) {
      alert('Palun täida kõik väljad ja vali fail.');
      return;
    }

    setIsUploading(true);
    console.log('Alustan üleslaadimist...');
    console.log('Pealkiri:', title);
    console.log('Artist:', artist);
    console.log('Fail:', selectedFile);

    try {
      //
      // TODO: Siia tuleb päris qortalRequest API kutse
      //
      // const result = await qortalRequest({
      //   action: "PUBLISH_QDN_RESOURCE",
      //   name: "KASUTAJA_NIMI_TULEB_STATE'IST", // sisselogitud kasutaja nimi
      //   service: "AUDIO",
      //   title: title,
      //   description: `Lugu esitajalt ${artist}`, // Kirjeldus
      //   file: selectedFile, // Või mingi muu viis faili edastamiseks
      // });
      // console.log("Qortal API vastus:", result);

      // Simuleerime edukat üleslaadimist
      await new Promise(resolve => setTimeout(resolve, 2000)); // Ootame 2 sekundit

      alert('Lugu on edukalt üles laaditud!');
      // Võiksime kasutaja suunata tagasi avalehele või laulu lehele
      // navigate('/');
      // Tühjendame vormi
      setTitle('');
      setArtist('');
      setSelectedFile(null);
      event.target.reset(); // Tühjendab ka faili inputi

    } catch (error) {
      console.error('Üleslaadimise viga:', error);
      alert('Üleslaadimine ebaõnnestus. Palun proovi uuesti.');
    } finally {
      setIsUploading(false); // Lõpetame laadimise oleku igal juhul
    }
  };

  return (
    <div className="add-music-page">
      <h2>Lae Üles Uus Lugu</h2>
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
          <label htmlFor="audioFile">Vali audiofail</label>
          <input
            type="file"
            id="audioFile"
            onChange={handleFileChange}
            accept="audio/*" // Lubame ainult audiofaile
            disabled={isUploading}
            required
          />
          {selectedFile && <p>Valitud fail: {selectedFile.name}</p>}
        </div>
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Laen üles...' : 'Lae Üles'}
        </button>
      </form>
    </div>
  );
}

export default AddMusicPage;