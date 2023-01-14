import React from "react";

export default function ({ guess }) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letterObj, index) => (
          <div key={index} className={letterObj.color}>
            {letterObj.key}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
