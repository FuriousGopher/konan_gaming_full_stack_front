import { useState, useEffect } from 'react';
import './App.css';
import { BASE_URL, getGamaData } from './apis/api';
import { GameData } from './models/GameModel.ts';
import { Button } from '@mui/material';
import ModalForRegister from './components/registration/registration.tsx';
import ModalForLogin from './components/login/login.tsx';

function App() {
  const [games, setGames] = useState([] as GameData[]);
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModalOpen, setLoginModelOpen] = useState(false);
  const [spinModalOpen, setSpinModalOpen] = useState(false);

  const handleRegisterModalOpen = () => {
    setRegisterModal(true);
  };
  const handleLoginOpen = () => {
    setLoginModelOpen(true);
  };

  const handleSpinModalOpen = () => {
    setSpinModalOpen(true);
  };

  const handleClose = () => {
    setRegisterModal(false);
    setLoginModelOpen(false);
    setSpinModalOpen(false);
  };

  useEffect(() => {
    fetchGamesData();
  }, []);

  const fetchGamesData = async () => {
    try {
      const gameData = await getGamaData();
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
      <div className="button-container">
        <div className="signup-button">
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegisterModalOpen}
          >
            {' '}
            Signup
          </Button>
          <ModalForRegister open={registerModal} handleClose={handleClose} />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleLoginOpen}>
            {' '}
            Login
          </Button>
          <ModalForLogin open={loginModalOpen} handleClose={handleClose} />
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSpinModalOpen}
        >
          {' '}
          Use slot machine
        </Button>
        <ModalForLogin open={spinModalOpen} handleClose={handleClose} />
      </div>
      <div className="App">
        <h1 className="main tile">List of games</h1>
        <div className="image-container">
          {games.map((game) => (
            <a
              key={game.id}
              href={game.startUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="game-link"
            >
              <img
                src={
                  game.thumb ? game.thumb.url : `${BASE_URL}/thumbnails/default`
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
