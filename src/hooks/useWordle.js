import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); // what turn the user is on, after 6 guesses game-over
  const [currentGuess, setCurrentGuess] = useState(""); // what user is typing currently, for every keyup it gets updated
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    // checking for letters that are in the solution word and at matching position (green letters)
    formattedGuess.forEach((letterObj, index) => {
      if (solutionArray[index].toLowerCase() === letterObj.key.toLowerCase()) {
        formattedGuess[index].color = "green";
        solutionArray[index] = null;
      }
    });

    formattedGuess.forEach((letterObj, index) => {
      if (
        solutionArray.includes(letterObj.key) &&
        letterObj.color !== "green"
      ) {
        formattedGuess[index].color = "yellow";
        solutionArray[solutionArray.indexOf(letterObj.key)] = null;
      }
    });
    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess.toLowerCase() === solution.toLowerCase()) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // only allow if turn is less than 5
      if (turn > 5) {
        console.log("Game over - you used all your guesses");
        return;
      }
      //do not allow duplicate words
      if (history.includes(currentGuess.toLowerCase())) {
        console.log("You already tried this word");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("Word must be 5 character long");
        return;
      }
      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
