import { useState, useEffect } from 'react';
import './App.css';
import { getGamaData, getThumbnailsDefault } from './apis/api';
import { GameData } from './models/GameModel.ts';

function App() {
  const [games, setGames] = useState([] as GameData[]);
  const [defaultImageUrl, setDefaultImageUrl] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchGamesData();
    fetchDefaultImage();
  }, []);

  const fetchGamesData = async () => {
    try {
      const gameData = await getGamaData();
      console.log(gameData);
      if (Array.isArray(gameData)) {
        setGames(gameData);
      } else {
        console.error('Invalid data received:', gameData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDefaultImage = async () => {
    try {
      const defaultImage = await getThumbnailsDefault();
      setDefaultImageUrl(defaultImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
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
              src={game.thumb ? game.thumb.url : defaultImageUrl}
              alt={game.title}
              className="game-image"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
