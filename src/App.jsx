import { useState, useEffect } from "react";
import ScoreBoard from "./components/ScoreBoard";
import { fetchPokemons, shuffleArray } from "./utils";
import Card from "./components/Card";
/* --------------------------- main app component --------------------------- */

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [registry, setRegistry] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  /* ----------------------------- event handlers ----------------------------- */
  function setScore(currScore, highScore) {
    if (currScore >= highScore) {
      setCurrentScore((currScore) => currScore + 1);
      setHighScore((currScore) => currScore + 1);
    } else {
      setCurrentScore(currScore);
    }
  }
  function resetGameOnWin() {
    setCurrentScore(0);
    setHighScore(0);
    setRegistry([]);
    setGameStatus("playing");
  }
  function resetGameOnLost() {
    setCurrentScore(0);
    setRegistry([]);
    setGameStatus("playing");
  }
  function shuffleCards() {
    let shuffledArr = shuffleArray(pokemons);
    setPokemons(shuffledArr);
  }
  function playRound(e) {
    let cardId = e.currentTarget.id;
    /* ------------------------- =>   shuffle the cards ------------------------- */
    /* -------------------------------- playRound ------------------------------- */
    /* --------------- => push id of clicked card into a registry -------------- */
    /* -------------- => check if game is won (display win screen) -------------- */
    /* ---------- => check if lost (clicked div id is in the registry) --------- */

    /* ------------------------- =>   shuffle the cards ------------------------- */
    shuffleCards();
    console.log({ currentScore });
    /* --------------- => push id of clicked card into a registry -------------- */
    setRegistry([...registry, { id: cardId }]);
    /* ---------- => check if lost (clicked div id is in the registry) --------- */
    if (registry.some((card) => card.id === cardId)) {
      setGameStatus("lost");
      return;
    }
    /* -------------- => check if game is won (display win screen) -------------- */
    if (currentScore === 9) {
      setGameStatus("won");
      return;
    }
    setScore(currentScore, highScore);
  }
  /* ----------------------------- useEffect hook ----------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemons();
      setPokemons(data);
    };
    fetchData();
  }, []);

  if (gameStatus === "lost") {
    return (
      <>
        <ScoreBoard currentScore={currentScore} highScore={highScore} />
        <div className="container">
          <div className="loosingScreen">
            <h1>You have lost</h1>
            <button onClick={resetGameOnLost}>Try again</button>
          </div>
        </div>
      </>
    );
  }
  if (gameStatus === "won") {
    return (
      <>
        <ScoreBoard currentScore={currentScore} highScore={highScore} />
        <div className="container">
          <div className="winningScreen">
            <h1>You Won, Congratulations!</h1>
            <button onClick={resetGameOnWin}>Play Again</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ScoreBoard currentScore={currentScore} highScore={highScore} />
      <div className="container">
        <div className="cards__container">
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} {...pokemon} onClick={(e) => playRound(e)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
