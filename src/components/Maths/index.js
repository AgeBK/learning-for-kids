import React, { useState, useCallback } from "react";
import User from "../User";
import Timer from "../Timer";
import Question from "../Question";
import Results from "../Results";
import Records from "../Records";
import Challenge from "../Challenge";
import { RandomColour } from "../../containers/RandomColour";

import wrong from "../../audio/wrong.mp3";
import cheer from "../../audio/cheer.mp3";
import correct from "../../audio/correct.mp3";
import fail from "../../audio/wah-wah-sad.mp3";
import styles from "./Maths.module.css";

function Maths() {
  console.log("Maths");

  const [step1, setStep1] = useState(false); // step 1: A name must be entered, then timer will display
  const [step2, setStep2] = useState(false); // step 2: Start. After pre-timer (Ready, set, go) runs, the questions will be presented and a timer will count down to zero
  const [step3, setStep3] = useState(false); // step 3: Completed. After timer has reached zero, process results, display in Records
  const [results, setResults] = useState([]); // store questions and answers for current challenge
  const [userName, setUserName] = useState("");
  const [operation, setOperation] = useState("Addition");
  const [position, setPosition] = useState(null);
  const getSign = operation === "Addition" ? "+" : "-";

  const submit = (num1, num2, val) => {
    const userAnswer = Number(val);
    let answer = 0;

    switch (operation) {
      case "Addition":
        answer = num1 + num2;
        break;
      case "Subtraction":
        answer = num1 > num2 ? num1 - num2 : num2 - num1;
        break;
      default:
        break;
    }

    const appropriateSound = new Audio(answer === userAnswer ? correct : wrong);
    appropriateSound.play();

    // console.log([...results, { num1, num2, answer, userAnswer }]);
    // console.log(num1 + num2 === userAnswer ? "Right" : "Wrong");
    setResults([...results, { num1, num2, answer, userAnswer }]);
  };

  const sortRecords = (arr) => {
    return arr
      .sort((a, b) => (a.correct > b.correct ? -1 : 1))
      .map((val, ind) => ({ ...val, position: ind + 1 }));
  };

  if (step3) {
    // finalise challenge/update records/don't bother if no results
    console.log(results.length);

    let pos = null;
    if (results.length) {
      console.log("Step 3 and Results");
      const records =
        JSON.parse(localStorage.getItem("learning-for-kids")) || [];
      const currentDate = Date().split(" ").slice(0, 5).toString(); // 'Thu', 'Sep', '14', '2023','09:39:09'
      console.log(currentDate);

      const currentResults = {
        date: currentDate,
        name: userName,
        challenge: operation,
        answered: results.length,
        correct: results.filter(
          ({ answer, userAnswer }) => answer === userAnswer
        ).length,
        wrong: results.filter(({ answer, userAnswer }) => answer !== userAnswer)
          .length,
      };

      console.log(currentResults);

      const arr = sortRecords([...records, currentResults]);
      console.log(arr);

      pos = arr.findIndex((val) => val.date === currentDate) + 1;
      console.log("Postion: " + pos);

      // const onCompleteMusic = new Audio(pos < 10 ? cheer : fail);
      // onCompleteMusic.play();

      localStorage.setItem("learning-for-kids", JSON.stringify(arr));
    }

    // if user clicked reset button, need to reset position and step3
    setPosition(pos);
    setStep3(false);
  }

  const erase = () => {
    console.log("erase");
    let mathRecords =
      JSON.parse(localStorage.getItem("learning-for-kids")) || [];

    mathRecords = mathRecords.filter((val) => val.name !== "Age");
    mathRecords = sortRecords(mathRecords);
    localStorage.setItem("learning-for-kids", JSON.stringify(mathRecords));
    setPosition(null); // trigger rerender to see update
  };

  // const setStep2 = useCallback(() => setStep2, []); TODO:// LOOK into this
  const cachedOperation = useCallback(() => setOperation, []);

  return (
    <div className={styles.container}>
      <User props={{ setUserName, userName, setStep1, step1, RandomColour }} />
      <Challenge props={{ step1, step2, operation, cachedOperation }} />
      <Question props={{ step1, step2, getSign, submit }} />
      <Timer props={{ step1, step2, step3, setStep2, setStep3, setResults }} />
      <Results props={{ results, getSign }} />
      {/* <button onClick={erase}></button> */}
      <Records position={position} />
    </div>
  );
}

export default Maths;
