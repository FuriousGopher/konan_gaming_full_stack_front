import { useState, useEffect } from 'react';
import './App.css';
import { BASE_URL, getGamaData } from './apis/api';
import { GameData } from './models/GameModel.ts';
import { Button } from '@mui/material';
import ModalForRegister from './components/registration/registration.tsx';
import ModalForLogin from './components/login/login.tsx';
import CustomHook from './utils/custom-hook.tsx';

function App() {
  const [games, setGames] = useState([] as GameData[]);
  const {
    isOpen: isRegisterModalOpen,
    openModal: openRegisterModal,
    closeModal: closeRegisterModal,
  } = CustomHook(false);
  const {
    isOpen: isLoginModalOpen,
    openModal: openLoginModal,
    closeModal: closeLoginModal,
  } = CustomHook(false);
  const {
    isOpen: isSlotMachineModalOpen,
    openModal: openSlotMachineModal,
    closeModal: closeSlotMachineModal,
  } = CustomHook(false);

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
      <div>
        <div className="button-container">
          <div className="signup-button">
            <Button
              variant="contained"
              color="primary"
              onClick={openRegisterModal}
            >
              {' '}
              Signup
            </Button>
            <ModalForRegister
              open={isRegisterModalOpen}
              handleClose={closeRegisterModal}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={openLoginModal}
            >
              {' '}
              Login
            </Button>
            <ModalForLogin
              open={isLoginModalOpen}
              handleClose={closeLoginModal}
            />
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={openSlotMachineModal}
          >
            {' '}
            Use slot machine
          </Button>
          <ModalForLogin
            open={isSlotMachineModalOpen}
            handleClose={closeSlotMachineModal}
          />
        </div>
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
