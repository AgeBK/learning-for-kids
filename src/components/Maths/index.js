import React, { useEffect, useState, useRef, useCallback } from "react";
import User from "../User";
import Timer from "../Timer";
import Records from "../Records";
import wrong from "../../audio/wrong.mp3";
import cheer from "../../audio/cheer.mp3";
import correct from "../../audio/correct.mp3";
import fail from "../../audio/wah-wah-sad.mp3";
import styles from "./Maths.module.css";

function Maths() {
  console.log("Maths");

  const [userName, setUserName] = useState("");
  const [step1, setStep1] = useState(false); // step 1: A name must be entered, then timer will display
  const [step2, setStep2] = useState(false); // step 2: Start. After pre-timer (Ready, set, go) runs, the questions will be presented
  const [step3, setStep3] = useState(false); // step 3: Completed. After timer has reached zero, process results, display in Records
  const answerRef = useRef(0); // store users answer
  const [results, setResults] = useState([]); // store questions and answers for current challenge
  const [finalResults, setFinalResults] = useState([]);
  const [position, setPosition] = useState(null);

  const [operation, setOperation] = useState("Addition");
  const operations = ["Addition", "Subtraction"];
  const maxNum = 20;
  const randomNumber = () => Math.round(Math.random() * maxNum);
  const getSign = operation === "Addition" ? "+" : "-";

  const ChooseOperation = () => {
    console.log("ChooseOperation");

    if (step1 && !step2) {
      return (
        <section className={styles.subCont}>
          <h3 className={styles.hdr}>Choose Challenge</h3>
          <div className={styles.btnCont}>
            {operations.map((val) => (
              <button
                className={`${styles.btn} ${
                  val === operation && styles.chosen
                }`}
                onClick={() => setOperation(val)}
                key={val}
              >
                {val}
              </button>
            ))}
          </div>
        </section>
      );
    }
    return null;
  };

  const submit = (num1, num2) => {
    const userAnswer = Number(answerRef.current.value);
    let answer = 0;
    switch (operation) {
      case "Addition":
        answer = num1 + num2;
        break;
      case "Subtraction":
        answer = num1 > num2 ? num1 - 2 : num2 - num1;
        break;
      default:
        break;
    }

    const appropriateSound = new Audio(answer === userAnswer ? correct : wrong);
    appropriateSound.play();

    console.log([...results, { num1, num2, answer, userAnswer }]);
    console.log(num1 + num2 === userAnswer ? "Right" : "Wrong");
    setResults([...results, { num1, num2, answer, userAnswer }]);
    answerRef.current = 0;
  };

  const RandomColour = ({ children }) => {
    var numLets = "0123456789ABCDEF";
    var colour = "#";
    for (var i = 0; i < 6; i++) {
      colour += numLets[Math.floor(Math.random() * 16)];
    }
    return <span style={{ color: colour }}>{children}</span>;
  };

  const RenderQuesiton = () => {
    console.log("RenderQuestion");
    if (step1 && step2) {
      // if (step1 && true) {
      const num1 = randomNumber();
      const num2 = randomNumber();
      // const answer = checkAnswer();

      return (
        <section className={styles.subCont}>
          <form onSubmit={submit} className={styles.form}>
            <div className={styles.qstnCont}>
              <RandomColour>{num1 > num2 ? num1 : num2}</RandomColour>
              <RandomColour>{getSign}</RandomColour>
              <RandomColour>{num1 > num2 ? num2 : num1}</RandomColour>
              <RandomColour>=</RandomColour>
              <input
                className={styles.input}
                type="text"
                maxLength="2"
                ref={answerRef}
                autoFocus
              />
              <button className={styles.btn} onClick={() => submit(num1, num2)}>
                Answer
              </button>
            </div>
          </form>
        </section>
      );
    }
  };

  const Results = () => {
    console.log("Results");
    const HTML = (
      <section className={styles.subCont}>
        <h3 className={styles.resultsHdr}>Results</h3>
        <div className={styles.resultsSubHdrs}>
          <h4 className={styles.correct}>
            Correct:
            {
              results.filter(({ answer, userAnswer }) => answer === userAnswer)
                .length
            }
          </h4>
          <h4 className={styles.wrong}>
            Wrong:
            {
              results.filter(({ answer, userAnswer }) => answer !== userAnswer)
                .length
            }
          </h4>
        </div>
        <hr />
        <div className={styles.resultCont}>
          <br />
          {results.map(({ num1, num2, answer, userAnswer, operation }, ind) => (
            <div className={styles.results}>
              <span className={styles.num}>Q{ind + 1}: </span>
              <span className={styles.num}>{num1}</span>
              <span className={styles.num}>{getSign}</span>
              <span className={styles.num}>{num2}</span>
              <span className={styles.num}> = </span>
              <span
                className={
                  userAnswer === answer ? styles.correct : styles.wrong
                }
              >
                {userAnswer}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
    return results.length ? HTML : null;
  };

  //
  const sortRecords = (arr) => {
    return arr
      .sort((a, b) => (a.correct > b.correct ? -1 : 1))
      .map((val, ind) => {
        //console.log(val);
        //console.log(val.position);
        val.position = ind + 1; // add position for sorting purposes
        return val;
      }); // TODO: 1 liner for map??
  };

  if (step3) {
    // finalise challenge/update records
    const records = JSON.parse(localStorage.getItem("learning-for-kids")) || [];
    const currentDate = Date().split(" ").slice(0, 5).toString(); // 'Thu', 'Sep', '14', '2023','09:39:09'
    console.log(currentDate);

    const currentResults = {
      date: currentDate,
      name: userName,
      challenge: operation,
      answered: results.length,
      correct: results.filter(({ answer, userAnswer }) => answer === userAnswer)
        .length,
      wrong: results.filter(({ answer, userAnswer }) => answer !== userAnswer)
        .length,
    };

    console.log(currentResults);

    const arr = sortRecords([...records, currentResults]);
    console.log(arr);

    const currentIndex = arr.findIndex((val) => val.date === currentDate) + 1;
    console.log("Postion: " + currentIndex);

    // const onCompleteMusic = new Audio(pos < 10 ? cheer : fail);
    // onCompleteMusic.play();

    localStorage.setItem("learning-for-kids", JSON.stringify(arr));
    // setResults([]); removes results, want to do this on start
    setPosition(currentIndex);
    setStep3(false);
  }

  const erase = () => {
    console.log("erase");
    let mathRecords =
      JSON.parse(localStorage.getItem("learning-for-kids")) || [];

    mathRecords = mathRecords.filter((val) => val.name !== "Agex");
    mathRecords = sortRecords(mathRecords);
    localStorage.setItem("learning-for-kids", JSON.stringify(mathRecords));
    setPosition(null); // trigger rerender to see update
  };

  // const setStep2 = useCallback(() => setStep2, []); TODO:// LOOK into this

  return (
    <>
      {/* <section className={styles.subCont}>
        {"Step1 " + step1} - {"Step2 " + step2} - {"Step3 " + step3}
      </section> */}
      <div className={styles.container}>
        <section className={styles.subCont}>
          <h2 className={styles.hdr} onClick={() => setStep1(false)}>
            {step1 &&
              userName
                .split("")
                .map((val) => <RandomColour>{val}</RandomColour>)}
          </h2>
          <User props={{ setUserName, userName, setStep1, step1 }} />
        </section>
        <ChooseOperation />
        <RenderQuesiton />
        {step1 && (
          <Timer props={{ step2, step3, setStep2, setStep3, setResults }} />
        )}
        <Results />
        {/* <button onClick={erase}></button> */}
        <Records position={position} />
      </div>
    </>
  );
}

export default Maths;
