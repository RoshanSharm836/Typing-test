import React from "react";

function Popup({ wpm, total, correct, wronge, setWpmchecker }) {
  return (
    <div className="Popup">
      <img src="../Typing-cuate.svg" alt="" width="35%" />
      <div className="bg">
        <span>Typing Test Complete!</span>
        <span>You typed the 1 Minute Typing Test.</span>
        <span>
          c{correct} w{wronge}
        </span>

        <span>
          Your speed was <span className="highlight">{wpm} wpm</span> with{" "}
          {total}% accuracy!
        </span>
        <a href="/" className="button-59">
          Home
        </a>
      </div>
      <span
        onClick={() => {
          setWpmchecker(false);
        }}
      >
        X
      </span>
    </div>
  );
}

export default Popup;
