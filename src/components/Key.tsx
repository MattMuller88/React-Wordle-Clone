import { useContext } from "react";
import { AppContext } from "../App";

interface KeyProps {
  keyVal: string;
  entDel?: boolean;
  wrong?: boolean;
}

function Key({ keyVal, entDel, wrong }: KeyProps) {
  const { onLetterInput, onEnter, onDelete } = useContext(AppContext);

  const inputLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onLetterInput(keyVal);
    }
  };

  return (
    <div
      className="key"
      id={entDel ? "entDel" : wrong ? "wrong" : ""}
      onClick={inputLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
