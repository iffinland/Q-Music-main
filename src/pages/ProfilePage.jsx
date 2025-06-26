// src/pages/ProfilePage.jsx
import React from 'react';

function ProfilePage() {
  return (
  <Router> {/* Ümbritse kogu rakendus Routeriga */}
      <div className="app-container">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser} // Anna kasutaja info Headerile
          onLoginLogoutClick={handleToggleLoginLogout}
          // onAddMusicClick={navigateToAddMusic} // Selle asemel kasutame Linki Headeris
        />
        <div style={{ display: 'flex', flexGrow: 1 }}> {/* Flex konteiner sisu ja külgriba jaoks */}
          <main className="main-content" style={{ flexGrow: 1, padding: '1rem' }}>
            {/* Siin toimub routimine */}
            <Routes>
              <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
              {/* Kaitstud route'id - ligipääs ainult sisselogituna */}
              <Route
                path="/add-music"
                element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" replace />} // Kui pole sisse logitud, suuna avalehele
              />
              <Route
                path="/create-playlist"
                element={isLoggedIn ? <CreatePlaylistPage /> : <Navigate to="/" replace />}
              />
              {/*
              <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin} />} />
              <Route
                path="/profile"
                element={isLoggedIn && currentUser ? <ProfilePage user={currentUser} /> : <Navigate to="/" replace />}
              />
              */}
              {/* Võiks lisada ka Not Found lehe (404) */}
              <Route path="*" element={<div><h2>404 Lehte ei leitud</h2><Link to="/">Mine avalehele</Link></div>} />
            </Routes>
          </main>

          {/* PAREM KÜLGRIBA (Sidebar) */}
          {isLoggedIn && currentUser && (
            <aside className="sidebar" style={{ width: '250px', padding: '1rem', borderLeft: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
              <h3>Tere, {currentUser.name}!</h3>
              <nav>
                <ul>
                  <li><Link to="/add-music">Lisa Muusikat</Link></li>
                  <li><Link to="/create-playlist">Loo Playlist</Link></li>
                  {/* <li><Link to="/profile">Minu Profiil</Link></li> */}
                  {/* ... muud lingid ... */}
                </ul>
              </nav>
              <p>Muu info/statistika...</p>
            </aside>
          )}
        </div>
        <Player currentSong={selectedSong} />
      </div>
    </Router>
  );
}
export default ProfilePage;