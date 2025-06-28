// src/pages/BrowseSongsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import MusicList from '../components/MusicList'; // Taaskasutame olemasolevat komponenti
// import { songs as allSongs } from '../data/mockSongs'; // Kasutame ajutiselt mock-andmeid

/* global qortalRequest */

// Loome suurema hulga mock-andmeid testimiseks
const generateMockSongs = (count) => {
  const artists = ['Alpha Band', 'Bravo Group', 'Charlie Singers', 'Delta Crew', 'Echo Collective', 'Foxtrot Funk'];
  const titles = ['Sunrise Melody', 'City Lights', 'Ocean Drive', 'Mountain High', 'Desert Heat', 'River Flow'];
  const songs = [];
  for (let i = 1; i <= count; i++) {
    const artist = artists[i % artists.length];
    songs.push({
      id: `song-${i}`,
      title: `${titles[i % titles.length]} #${i}`,
      artist: artist,
    });
  }
  return songs;
};
const allMockSongs = generateMockSongs(250); // Genereerime 250 laulu testimiseks


function BrowseSongsPage({ onSongSelect }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Loeme parameetrid URL-ist
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentLetter = searchParams.get('letter') || 'All';
  const limit = 100;

  // See hook käivitub, kui leht laetakse või kui URL-i parameetrid muutuvad
  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      console.log(`Pärin laule: leht ${currentPage}, täht '${currentLetter}'`);

      try {
        // **** SIIA TULEB PÄRIS API KUTSE ****
        // const requestObject = {
        //   action: "SEARCH_QDN_RESOURCES", // OLETUS!
        //   service: "AUDIO",
        //   limit: limit,
        //   offset: (currentPage - 1) * limit,
        //   name: currentLetter !== 'All' ? currentLetter : undefined, // Oletus, et saab nime järgi otsida
        //   // Või on parameeter 'prefix', nt: prefix: currentLetter,
        // };
        // const fetchedSongs = await qortalRequest(requestObject);
        // setSongs(fetchedSongs);
        
        // Simuleerime API kutset mock-andmetega
        await new Promise(resolve => setTimeout(resolve, 500));
        let filteredSongs = allMockSongs;
        if (currentLetter !== 'All') {
          filteredSongs = allMockSongs.filter(song => 
            song.artist.toUpperCase().startsWith(currentLetter.toUpperCase())
          );
        }
        const paginatedSongs = filteredSongs.slice((currentPage - 1) * limit, currentPage * limit);
        setSongs(paginatedSongs);

      } catch (error) {
        console.error("Laulude pärimine ebaõnnestus:", error);
        alert("Laulude laadimine ebaõnnestus.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [currentPage, currentLetter]); // Käivita uuesti, kui leht või täht muutub

  // Funktsioonid parameetrite muutmiseks URL-is
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, letter: currentLetter });
  };
  const handleLetterChange = (newLetter) => {
    setSearchParams({ page: 1, letter: newLetter }); // Tähe muutmisel alusta alati esimeselt lehelt
  };

  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  return (
    <div className="page-container browse-page">
      <h2>Sirvi Lugusid</h2>

      {/* Tähestiku filter */}
      <div className="alphabet-filter">
        {alphabet.map(letter => (
          <button
            key={letter}
            className={currentLetter === letter ? 'active' : ''}
            onClick={() => handleLetterChange(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Laulude nimekiri */}
      {isLoading ? (
        <p>Laen...</p>
      ) : (
        // Kasutame siin tavalist listi, kuna horisontaalne kerimine pole vajalik
        // MusicList komponent peaks samuti töötama
        <div className="song-grid">
          {songs.map(song => (
            <div key={song.id} className="song-item" onClick={() => onSongSelect(song)}>
              {/* Siia võiks lisada pildi, kui see on olemas */}
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
          ))}
          {songs.length === 0 && <p>Selle valikuga laule ei leitud.</p>}
        </div>
      )}

      {/* Pagineerimise nupud */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          Eelmine
        </button>
        <span>Leht {currentPage}</span>
        {/* "Järgmine" nuppu ei näidata, kui praegusel lehel on vähem kui 'limit' laulu */}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={songs.length < limit}>
          Järgmine
        </button>
      </div>
    </div>
  );
}

export default BrowseSongsPage;