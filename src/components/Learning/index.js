import React, { useState } from "react";
import Spelling from "../Spelling";
import User from "../User";
import Timer from "../Timer";
import Maths from "../Maths";
import Results from "../Results";
import Records from "../Records";
import Challenge from "../Challenge";
import Error from "../Error";
import incorrect from "../../audio/incorrect.mp3";
import cheer from "../../audio/cheer.mp3";
import correct from "../../audio/correct.mp3";
import fail from "../../audio/wah-wah-sad.mp3";

function Learning({ setSpellingBG }) {
  // console.log("Learning");

  const [step1, setStep1] = useState(false); // step 1: A name must be entered, then timer will display
  const [step2, setStep2] = useState(false); // step 2: Start. After pre-timer (Ready, set, go) runs, the questions will be presented and a timer will count down to zero
  const [step3, setStep3] = useState(false); // step 3: Completed. After timer has reached zero, process results, display in Records
  const [results, setResults] = useState([]); // store questions and answers for current challenge
  const [isError, setIsError] = useState(false); // if an API error occurs, display friendly error message
  const [userName, setUserName] = useState("");
  const [challenge, setChallenge] = useState("Maths"); // default challenge will be maths
  const [operation, setOperation] = useState("Addition"); // default operation will be Addition
  const [position, setPosition] = useState(null); // position in record list current user placed
  const getSign = operation === "Addition" ? "+" : "-";
  const recordData = "learning-for-kids-" + challenge.toLowerCase(); // string used by localStorage
  const isMaths = challenge === "Maths";

  const playAppropriateSound = (tune) => {
    const appropriateSound = new Audio(tune);
    appropriateSound.play();
  };

  const submit = (answer, userAnswer, num1, num2) => {
    playAppropriateSound(answer === userAnswer ? correct : incorrect);
    setResults([...results, { answer, userAnswer, num1, num2 }]);
  };

  if (step3) {
    // finalise challenge/update records/don't bother if no results
    let pos = null;

    if (results.length) {
      const records = JSON.parse(localStorage.getItem(recordData)) || [];
      const currentDate = Date().split(" ").slice(0, 5).toString(); // ['Thu', 'Sep', '14', '2023','09:39:09']

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

      const arr = [...records, currentResults]
        .sort((a, b) => (a.correct > b.correct ? -1 : 1))
        .map((val, ind) => ({ ...val, position: ind + 1 }));
      localStorage.setItem(recordData, JSON.stringify(arr));
      pos = arr.findIndex((val) => val.date === currentDate) + 1;
      playAppropriateSound(pos <= 10 ? cheer : fail);
    }

    // if user clicked reset button, need to reset position and step3
    setPosition(pos);
    setStep3(false);
  }

  return (
    <>
      <User
        setUserName={setUserName}
        userName={userName}
        setStep1={setStep1}
        step1={step1}
      />
      {step1 && !step2 && !isError && (
        <Challenge
          challenge={challenge}
          setChallenge={setChallenge}
          operation={operation}
          setOperation={setOperation}
          isMaths={isMaths}
          setResults={setResults}
          setPosition={setPosition}
          setSpellingBG={setSpellingBG}
        />
      )}
      {isError && <Error />}
      {step1 && step2 && !isMaths && !isError && (
        <Spelling submit={submit} results={results} setIsError={setIsError} />
      )}
      {step1 && step2 && isMaths && !isError && (
        <Maths step1={step1} step2={step2} getSign={getSign} submit={submit} />
      )}
      {step1 && !isError && (
        <Timer
          step2={step2}
          setStep2={setStep2}
          setStep3={setStep3}
          setResults={setResults}
          isError={isError}
        />
      )}
      {results.length > 0 && !isError && (
        <Results
          getSign={getSign}
          results={results}
          challenge={challenge}
          isMaths={isMaths}
        />
      )}
      <Records position={position} recordData={recordData} />
    </>
  );
}

export default Learning;
