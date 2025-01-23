import "./App.css";
import { useState, createContext, useEffect, SetStateAction } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardMatrix, genWordSet } from "./Words";
import GameOver from "./components/GameOver";

// Define structure for AppContext
interface AppContextType {
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  attempt: {
    attempt: number;
    letterPos: number;
  };
  setAttempt: React.Dispatch<
    React.SetStateAction<{
      attempt: number;
      letterPos: number;
    }>
  >;
  onLetterInput: (kayVal: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  correctWord: string;
  wordSet: Set<unknown>;
  setWordSet: React.Dispatch<SetStateAction<Set<unknown>>>;
  wrongLetters: string[];
  setWrongLetters: React.Dispatch<SetStateAction<string[]>>;
  gameOver: {
    gameOver: boolean;
    guessedWord: boolean;
  };
  setGameOver: React.Dispatch<
    SetStateAction<{
      gameOver: boolean;
      guessedWord: boolean;
    }>
  >;
}

// Create AppContext
export const AppContext = createContext<AppContextType>({
  board: boardMatrix,
  setBoard: () => {},
  attempt: { attempt: 0, letterPos: 0 },
  setAttempt: () => {},
  onLetterInput: () => {},
  onEnter: () => {},
  onDelete: () => {},
  correctWord: "",
  wordSet: new Set(),
  setWordSet: () => {},
  wrongLetters: [],
  setWrongLetters: () => {},
  gameOver: {
    gameOver: false,
    guessedWord: false,
  },
  setGameOver: () => {},
});

function App() {
  // Store the state of the wordle board matrix in board variable
  const [board, setBoard] = useState(boardMatrix);
  // Store state of current input position on board matrix
  const [attempt, setAttempt] = useState({ attempt: 0, letterPos: 0 });
  // Store set of words in word bank
  const [wordSet, setWordSet] = useState(new Set()); //<Set<string>>(new Set());
  // Store randomly generated correct word
  const [correctWord, setCorrectWord] = useState("");
  // Store state containing list of incorrectly guessed letters
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  // Store state of game to determine gmae over message
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  // Generate word Set from word bank and set correct word
  useEffect(() => {
    genWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  // Define functions for handling input
  const onLetterInput = (keyVal: string) => {
    if (attempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[attempt.attempt][attempt.letterPos] = keyVal;
    setBoard(newBoard);
    setAttempt({ ...attempt, letterPos: attempt.letterPos + 1 });
  };
  const onEnter = () => {
    if (attempt.letterPos !== 5) return;

    let answer = "";
    for (let i = 0; i < 5; i++) {
      answer += board[attempt.attempt][i];
    }
    if (wordSet.has(answer.toLowerCase())) {
      setAttempt({ attempt: attempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Not In Word List");
    }

    if (answer.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (attempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };
  const onDelete = () => {
    if (attempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[attempt.attempt][attempt.letterPos - 1] = "";
    setBoard(newBoard);
    setAttempt({ ...attempt, letterPos: attempt.letterPos - 1 });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          attempt,
          setAttempt,
          onLetterInput,
          onEnter,
          onDelete,
          correctWord,
          wordSet,
          setWordSet,
          wrongLetters,
          setWrongLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />

          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
