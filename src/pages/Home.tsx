import { useEffect, useState } from 'react';
import { GameData } from '../models/GameModel.ts';
import CustomHook from '../utils/custom-hook.tsx';
import { BASE_URL, getGamaData } from '../apis/api.ts';
import { Button } from '@mui/material';
import ModalForRegister from '../components/registration/ModalForRegister.tsx';
import ModalForLogin from '../components/login/ModalForLogin.tsx';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search-bar/SearchBar.tsx';
import './Home.css';

function Home() {
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
    <div className="container">
      <div className="top-bar">
        <div className="top-left">
          <Link to="/slot-machine">
            <Button variant="contained" color="primary">
              Slot machine
            </Button>
          </Link>
        </div>
        <div className="top-right">
          <Button variant="contained" color="primary" onClick={openLoginModal}>
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={openRegisterModal}
          >
            Signup
          </Button>
        </div>
      </div>
      <div className="search-bar">
        <SearchBar onSearch={fetchGamesData} />
      </div>
      <div className="main-content">
        <h1 className="main tile">List of games</h1>
        {games.length === 0 ? (
          <div className="no-games">No games found</div>
        ) : (
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
        )}
      </div>
      <ModalForLogin open={isLoginModalOpen} handleClose={closeLoginModal} />
      <ModalForRegister
        open={isRegisterModalOpen}
        handleClose={closeRegisterModal}
      />
    </div>
  );
}

export default Home;
