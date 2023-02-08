import React from "react";

export default function EndModal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>Hurray!! :)  You Won!</h1>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses </p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Nevermind!</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time :) </p>
        </div>
      )}
    </div>
  );
}
