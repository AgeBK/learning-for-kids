import React, { useState, useCallback, useMemo } from "react";
import Spelling from "../Spelling";

import User from "../User";
import Timer from "../Timer";
import Question from "../Question";
import Results from "../Results";
import Records from "../Records";
import Challenge from "../Challenge";
import wrong from "../../audio/wrong.mp3";
import cheer from "../../audio/cheer.mp3";
import correct from "../../audio/correct.mp3";
import fail from "../../audio/wah-wah-sad.mp3";

function Maths() {
  console.log("Maths");

  const [step1, setStep1] = useState(false); // step 1: A name must be entered, then timer will display
  const [step2, setStep2] = useState(false); // step 2: Start. After pre-timer (Ready, set, go) runs, the questions will be presented and a timer will count down to zero
  const [step3, setStep3] = useState(false); // step 3: Completed. After timer has reached zero, process results, display in Records
  const [results, setResults] = useState([]); // store questions and answers for current challenge
  const [userName, setUserName] = useState("");
  const [challenge, setChallenge] = useState("Maths"); // default challenge will be maths
  const [operation, setOperation] = useState("Addition"); // default operation will be spelling
  const [position, setPosition] = useState(null);
  const getSign = operation === "Addition" ? "+" : "-";

  const submit = useCallback(
    (num1, num2, val) => {
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

      const appropriateSound = new Audio(
        answer === userAnswer ? correct : wrong
      );
      appropriateSound.play();
      setResults([...results, { num1, num2, answer, userAnswer }]);
    },
    [setResults, operation, results]
  );

  const sortRecords = (arr) => {
    return arr
      .sort((a, b) => (a.correct > b.correct ? -1 : 1))
      .map((val, ind) => ({ ...val, position: ind + 1 }));
  };

  if (step3) {
    // finalise challenge/update records/don't bother if no results
    let pos = null;

    if (results.length) {
      const records =
        JSON.parse(localStorage.getItem("learning-for-kids")) || [];
      const currentDate = Date().split(" ").slice(0, 5).toString(); // 'Thu', 'Sep', '14', '2023','09:39:09'

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

      const arr = sortRecords([...records, currentResults]);
      pos = arr.findIndex((val) => val.date === currentDate) + 1;
      localStorage.setItem("learning-for-kids", JSON.stringify(arr));

      const onCompleteMusic = new Audio(pos <= 10 ? cheer : fail);
      onCompleteMusic.play();
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
    setPosition(null);
  };

  const cachedResults = useMemo(() => results, [results]);

  const RenderSpelling = () =>
    step1 && challenge === "Spelling" && <Spelling />;

  return (
    <>
      <User
        setUserName={setUserName}
        userName={userName}
        setStep1={setStep1}
        step1={step1}
      />
      <Challenge
        step1={step1}
        step2={step2}
        challenge={challenge}
        setChallenge={setChallenge}
        operation={operation}
        setOperation={setOperation}
      />
      {/* <Spelling step1={step1} step2={step2} challenge={challenge} /> */}
      <RenderSpelling />

      <Question step1={step1} step2={step2} getSign={getSign} submit={submit} />
      <Timer
        step1={step1}
        step2={step2}
        step3={step3}
        setStep2={setStep2}
        setStep3={setStep3}
        setResults={setResults}
      />
      <Results getSign={getSign} cachedResults={cachedResults} />
      {/* <button onClick={erase}>Erase</button> */}
      <Records position={position} />
    </>
  );
}

export default Maths;
