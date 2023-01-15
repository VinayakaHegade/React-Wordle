import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, turn, isCorrect, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      console.log("Hurray!!!.. You Won!");
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      console.log("Unlucky :(  you ran out of guesses");
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      <div>Solution - {solution.toUpperCase()}</div>
      <div>Current guess - {currentGuess.toUpperCase()}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
    </div>
  );
}
