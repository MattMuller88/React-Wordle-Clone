import { useContext, useEffect } from "react";
import { AppContext } from "../App";

interface LetterProps {
  letterPos: number;
  attemptNum: number;
}

function Letter({ letterPos, attemptNum }: LetterProps) {
  // Use AppContext
  const { board, correctWord, attempt, setWrongLetters } =
    useContext(AppContext);

  // Letter variable with position in board matrix
  const letter = board[attemptNum][letterPos];

  // Variables to determine if letter is in correct spot or elsewhere in correct word
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const contains =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  // Variable to determine color of letter block
  const letterState =
    attempt.attempt > attemptNum
      ? correct
        ? "correct"
        : contains
        ? "contains"
        : "wrong"
      : undefined;

  // Update wrongLetters array with newly guessed wrong letters
  useEffect(() => {
    if (letter !== "" && !correct && !contains) {
      setWrongLetters((prevWrong) => [...prevWrong, letter]);
    }
  }, [attempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
