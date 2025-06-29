// src/components/Player.jsx - LÕPLIK KOOS HELITUGEVUSEGA
import React, { useState, useEffect, useRef } from 'react';
/* global qortalRequest */

const PlayIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg> );
const PauseIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg> );
const VolumeHighIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" /></svg> );
const VolumeMuteIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.19,21.19L2.81,2.81L1.39,4.22L7.22,10.05L7,10H3V14H7L12,19V13.22L16.2,17.42C15.75,17.72 15.27,17.96 14.77,18.11L14.76,18.12L14,18.7V20.77C15.06,20.44 16.03,19.83 16.85,19.03L19.97,22.15L21.39,20.73L21.19,21.19V21.19M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,15 21,13.57 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M14,7.97V10.18L15.48,11.66C15.5,11.78 15.5,11.89 15.5,12C15.5,13.76 14.5,15.29 13.03,16.04L14,17.01V16V7.97Z" /></svg> );

const formatTime = (time) => { if (isNaN(time) || !isFinite(time)) return '0:00'; const minutes = Math.floor(time / 60); const seconds = Math.floor(time % 60).toString().padStart(2, '0'); return `${minutes}:${seconds}`; };

function Player({ currentSong }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoadingSong, setIsLoadingSong] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [lastVolume, setLastVolume] = useState(0.75);

  useEffect(() => {
    const loadAndPlaySong = async () => {
      if (!currentSong || !currentSong.qdnData) return;
      setIsLoadingSong(true);
      setIsPlaying(false);
      audioRef.current.src = "";
      try {
        const { name, service, identifier } = currentSong.qdnData;
        const resourceData = await qortalRequest({ action: "FETCH_QDN_RESOURCE", name, service, identifier, encoding: "base64" });
        const audioSrc = `data:audio/mpeg;base64,${resourceData}`;
        audioRef.current.src = audioSrc;
        const playPromise = audioRef.current.play();
        if (playPromise) { playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false)); }
      } catch (error) {
        alert(`Viga loo laadimisel: ${error.message || 'Tundmatu viga'}`);
      } finally {
        setIsLoadingSong(false);
      }
    };
    if (currentSong) loadAndPlaySong();
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlayPause = () => { if (!audioRef.current?.src || isLoadingSong) return; if (isPlaying) audioRef.current.pause(); else audioRef.current.play(); setIsPlaying(!isPlaying); };
  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);
  const handleProgressChange = (e) => { audioRef.current.currentTime = e.target.value; };
  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));
  const toggleMute = () => { if (volume > 0) { setLastVolume(volume); setVolume(0); } else { setVolume(lastVolume > 0 ? lastVolume : 0.75); } };

  return (
    <div className="player-bar">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} />
      <div className="player-song-info">
        {currentSong ? ( <div><strong>{currentSong.title}</strong><p>{currentSong.artist}</p></div> ) : ( <p>Vali lugu kuulamiseks</p> )}
      </div>
      <div className="player-controls">
        <button onClick={togglePlayPause} disabled={!currentSong || isLoadingSong} className="play-pause-btn">
          {isLoadingSong ? "Laen..." : (isPlaying ? <PauseIcon /> : <PlayIcon />)}
        </button>
        <div className="progress-container">
          <span>{formatTime(currentTime)}</span>
          <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleProgressChange} className="progress-bar" disabled={!currentSong || isLoadingSong} />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="player-volume-controls">
        <button onClick={toggleMute} className="volume-btn">
          {volume === 0 ? <VolumeMuteIcon /> : <VolumeHighIcon />}
        </button>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-slider" />
      </div>
    </div>
  );
}
export default Player;