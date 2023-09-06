import React, { useState, useEffect } from 'react';
import './App.css';
import { BASE_URL, getGamaData } from './apis/api';
import { GameData } from './models/GameModel.ts';
import { Button } from '@mui/material';
import ModalDialog from './components/registration/registration.tsx';
import SearchBar from './components/search-bar/SearchBar.tsx';

function App() {
  const [games, setGames] = useState([] as GameData[]);
  const [open, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchGamesData();
  }, []);

  const fetchGamesData = async (query = '') => {
    try {
      const gameData = await getGamaData(query);
      if (Array.isArray(gameData)) {
        setGames(gameData);
      } else {
        console.error('Invalid data received:', gameData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          {' '}
          Signup
        </Button>
        <ModalDialog open={open} handleClose={handleClose} />
      </div>
      <div>
        <SearchBar onSearch={fetchGamesData} />
      </div>
      <div className="App">
        <h1 className="main tile">List of games</h1>
        <div className="image-container">
          {!games.length
            ? 'No Games found'
            : games.map((game) => (
                <a
                  key={game.id}
                  href={game.startUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="game-link"
                >
                  <img
                    src={
                      game.thumb
                        ? game.thumb.url
                        : `${BASE_URL}/thumbnails/default`
                    }
                    alt={game.title}
                    className="game-image"
                  />
                </a>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
