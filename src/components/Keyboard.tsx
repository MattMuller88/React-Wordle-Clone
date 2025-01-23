import { useCallback, useContext, useEffect } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  // Arrays to hold letters on each line of keyboard
  const line1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const line2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const line3 = ["Z", "X", "C", "V", "B", "N", "M"];

  // Use AppContext
  const { onLetterInput, onEnter, onDelete, wrongLetters } =
    useContext(AppContext);

  // Function for handling keyboard input
  const handleKeyboard = useCallback(
    (event: { key: string }) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        line1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onLetterInput(key);
          }
        });
        line2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onLetterInput(key);
          }
        });
        line3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onLetterInput(key);
          }
        });
      }
    },
    [onLetterInput, onEnter, onDelete]
  );

  // Event Listener for keyboard input
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="kbline1">
        {line1.map((key) => {
          return <Key keyVal={key} wrong={wrongLetters.includes(key)} />;
        })}
      </div>
      <div className="kbline2">
        {line2.map((key) => {
          return <Key keyVal={key} wrong={wrongLetters.includes(key)} />;
        })}
      </div>
      <div className="kbline3">
        <Key keyVal="ENTER" entDel={true} />
        {line3.map((key) => {
          return <Key keyVal={key} wrong={wrongLetters.includes(key)} />;
        })}
        <Key keyVal="DELETE" entDel={true} />
      </div>
    </div>
  );
}

export default Keyboard;
