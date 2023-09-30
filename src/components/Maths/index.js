import React, { useState } from "react";
import Spelling from "../Spelling";
import User from "../User";
import Timer from "../Timer";
import Question from "../Question";
import Results from "../Results";
import Records from "../Records";
import Challenge from "../Challenge";
import Error from "../Error";
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
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [challenge, setChallenge] = useState("Maths"); // default challenge will be maths
  const [operation, setOperation] = useState("Addition"); // default operation will be Addition
  const [position, setPosition] = useState(null);
  const getSign = operation === "Addition" ? "+" : "-";
  const recordData = "learning-for-kids-" + challenge.toLowerCase();
  const isMaths = challenge === "Maths";

  const playAppropriateSound = (tune) => {
    const appropriateSound = new Audio(tune);
    appropriateSound.play();
  };

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
    playAppropriateSound(answer === userAnswer ? correct : wrong);
    setResults([...results, { num1, num2, answer, userAnswer }]);
  };

  const submitSpelling = (e, userAnswer, answer) => {
    if (userAnswer.length === 0) return;

    e.preventDefault();
    playAppropriateSound(answer === userAnswer ? correct : wrong);

    setResults([...results, { answer: userAnswer, userAnswer: answer }]);
    console.log(results);
  };

  const sortRecords = (arr) => {
    return arr
      .sort((a, b) => (a.correct > b.correct ? -1 : 1))
      .map((val, ind) => ({ ...val, position: ind + 1 }));
  };

  if (step3) {
    // finalise challenge/update records/don't bother if no results
    let pos = null;

    if (results.length) {
      const records = JSON.parse(localStorage.getItem(recordData)) || [];
      const currentDate = Date().split(" ").slice(0, 5).toString(); // 'Thu', 'Sep', '14', '2023','09:39:09'

      const currentResults = {
        date: currentDate,
        name: userName,
        challenge: isMaths ? operation : challenge,
        answered: results.length,
        correct: results.filter(
          ({ answer, userAnswer }) => answer === userAnswer
        ).length,
        wrong: results.filter(({ answer, userAnswer }) => answer !== userAnswer)
          .length,
      };

      const arr = sortRecords([...records, currentResults]);
      pos = arr.findIndex((val) => val.date === currentDate) + 1;
      localStorage.setItem(recordData, JSON.stringify(arr));

      // const onCompleteMusic = new Audio(pos <= 10 ? cheer : fail);
      // onCompleteMusic.play();

      playAppropriateSound(pos <= 10 ? cheer : fail);
    }

    // if user clicked reset button, need to reset position and step3
    setPosition(pos);
    setStep3(false);
  }

  // Testing: record modifying
  const erase = () => {
    console.log("erase");
    let mathRecords = JSON.parse(localStorage.getItem(recordData)) || [];
    mathRecords = mathRecords
      .filter((val) => val.correct > 2 && val.correct < 6)
      .map((val) => ({ ...val, name: "Timmy" }));
    mathRecords = sortRecords(mathRecords);
    localStorage.setItem(recordData, JSON.stringify(mathRecords));
    setPosition(null);
  };

  // console.log("is Error: " + isError);

  return (
    <>
      <User
        setUserName={setUserName}
        userName={userName}
        setStep1={setStep1}
        step1={step1}
      />
      {step1 && !step2 && (
        <Challenge
          step1={step1}
          step2={step2}
          challenge={challenge}
          setChallenge={setChallenge}
          operation={operation}
          setOperation={setOperation}
          isMaths={isMaths}
        />
      )}
      {isError && <Error />}
      {step1 && step2 && !isMaths && !isError && (
        <Spelling
          submit={submitSpelling}
          results={results}
          setIsError={setIsError}
        />
      )}
      {step1 && step2 && isMaths && !isError && (
        <Question
          step1={step1}
          step2={step2}
          getSign={getSign}
          submit={submit}
        />
      )}
      {step1 && (
        <Timer
          step1={step1}
          step2={step2}
          step3={step3}
          setStep2={setStep2}
          setStep3={setStep3}
          setResults={setResults}
          isError={isError}
        />
      )}
      {results.length > 0 && (
        <Results
          getSign={getSign}
          results={results}
          challenge={challenge}
          isMaths={isMaths}
        />
      )}

      <button onClick={erase}>Erase</button>
      {/* <button onClick={() => setIsError(true)}>Error</button> */}
      <Records position={position} recordData={recordData} />
    </>
  );
}

export default Maths;
