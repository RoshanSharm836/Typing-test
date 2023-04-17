import { useEffect, useRef, useState } from "react";
import Popup from "./Popup";
export default function Input() {
  let data =
    "Before you can begin to determine what the composition of a particular paragraph will be, you must first decide on an argument and a working thesis statement for your paper. What is the most important idea that you are trying to convey to your reader? The information in each paragraph must be related to that idea. In other words, your paragraphs should remind your reader that there is a recurrent relationship between your thesis and the information in each paragraph. A working thesis functions like a seed from which your paper, and your ideas, will grow.";
  let arr = data.split("");
  const [keysPressed, setKeysPressed] = useState([]);
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wronge, setWronge] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [wpmchecker, setWpmchecker] = useState(false);
  const [answer, setAnswer] = useState(1);
  const textarea = useRef();

  useEffect(() => {
    if (seconds > 0 && isActive) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (seconds === 0) {
      setAnswer(Math.floor(keysPressed.join("").split(" ").length));
      setWpmchecker(true);
      textarea.current.value = "";
      console.log("answer", answer);
      setIsActive(false);
    }
  }, [seconds, isActive]);

  function reset() {
    setIsActive(false);
    setKeysPressed([]);
    setCount(0);
    setCorrect(0);
    setSeconds(60);
    setWronge(0);
    setWpmchecker(false);
  }
  function handleKeyDown(event) {
    const { key } = event;
    if (key !== "Backspace" && key !== "Shift" && key !== "Enter") {
      setCount((count) => count + 1);
      setKeysPressed((keysPressed) => [...keysPressed, key]);
      checker(key, count);
    }
    if (!isActive) {
      setIsActive(true);
    }
  }

  function checker(key) {
    let typing = document.querySelector(".box");
    let char = typing.querySelectorAll("span")[count];
    // console.log(char.innerHTML);
    // console.log(count);
    if (key === arr[count]) {
      char.classList.add("correct");
      setCorrect(correct + 1);
    } else {
      char.classList.add("wronge");
      setWronge(wronge + 1);
    }
  }

  return (
    <div className="container">
      <div className="box">
        {arr.map((el, i) => {
          return <span key={i}>{el}</span>;
        })}
      </div>

      <div className="Ans">
        <div>
          <span>Correct Words:{correct}</span>
          <span>Wronge Words:{wronge}</span>
          <span>Total Words:{count}</span>
          {wpmchecker ? <span>Wpm:{answer}</span> : ""}
          <span>Timer:{seconds}'s</span>
        </div>
      </div>
      {/* <div className="box">{keysPressed}</div> */}

      <textarea
        id="w3review"
        name="w3review"
        rows="10"
        cols="50"
        ref={textarea}
        placeholder="Start typing.... "
        onKeyDown={(e) => {
          handleKeyDown(e, count);
        }}
      ></textarea>

      {wpmchecker ? (
        <Popup
          data={reset}
          correct={correct}
          wronge={wronge}
          wpm={answer}
          setWpmchecker={setWpmchecker}
          total={count}
        />
      ) : (
        ""
      )}
    </div>
  );
}
