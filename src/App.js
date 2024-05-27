import { useEffect, useState } from "react";
import "./App.css";
import Tile from "./components/Tile";

const tileImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [tiles, setTiles] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  /*
    ? Function to generate and shuffle the tiles to create the tile grid
  */
  const shuffletiles = () => {
    const shuffledtiles = [...tileImages, ...tileImages]
      .sort(() => Math.random() - 0.5)
      .map((tile) => {
        return { id: Math.random(), ...tile };
      });

    setTiles(shuffledtiles);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  // ! Handling the User when they click on a tile
  const handleChoice = (tile) => {
    choiceOne ? setChoiceTwo(tile) : setChoiceOne(tile);
  };

  //? Compare the selected tiles
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setTiles((previousTiles) => {
          return previousTiles.map((tile) => {
            if (tile.src === choiceOne.src) {
              return { ...tile, matched: true };
            } else {
              return tile;
            }
          });
        });
        resetTurns();
      } else {
        // console.log("The Tiles DO NOT MATCH");
        setTimeout(() => resetTurns(), 600);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(tiles);

  //? Reset choices and increase the turns
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((previousTurns) => previousTurns + 1);
    setDisabled(false);
  };

  //? Start the game automatically initially
  useEffect(() => {
    shuffletiles();
  }, []);

  return (
    <div className="App">
      <h1>FLIP TILES</h1>
      <button onClick={shuffletiles}>New Game</button>

      <div className="tile-grid">
        {tiles.map((tile) => (
          <Tile
            tile={tile}
            key={tile.id}
            handleChoice={handleChoice}
            flipped={tile === choiceOne || tile === choiceTwo || tile.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>TURNS: {turns}</p>
    </div>
  );
}

export default App;
