import { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  // Use AppContext
  const { gameOver, attempt, correctWord } = useContext(AppContext);

  // Determine game over message
  const message = gameOver.guessedWord
    ? "You Got It in " + attempt.attempt + " Attempts!"
    : "You Didn't Get It This Time";

  // Function to play again by refreshing page
  const playAgain = () => {
    window.location.reload();
  };

  // Display message and correct word
  return (
    <div className="gameOver">
      <h2>{message}</h2>
      <h1>The Word was: {correctWord.toUpperCase()}</h1>
      <button onClick={playAgain}>Play Again</button>
    </div>
  );
}

export default GameOver;
