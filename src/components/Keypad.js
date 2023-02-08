import React, { useEffect, useState } from "react";

export default function Keypad({usedKeys}) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("https://helpful-overcoat-wasp.cyclic.app/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((letterObj) => {
          const color = usedKeys[letterObj.key]
          return <div className={color} key={letterObj.key}>{letterObj.key}</div>;
        })}
    </div>
  );
}
