import React, { useEffect, useState, useRef, useCallback } from "react";
import User from "../User";
import Timer from "../Timer";
import styles from "./Maths.module.css";

function Maths() {
  const [results, setResults] = useState([]); // store questions and answers for current challenge
  const [userName, setUserName] = useState("");
  const [step1, setStep1] = useState(false); // step 1: A name must be entered, then timer will display
  const [step2, setStep2] = useState(false); // step 2:  After pre-timer (Ready, set, go) runs, the questions will be presented
  const answerRef = useRef(0); // store users answer
  const [operation, setOperation] = useState("Addition");
  const operations = ["Addition", "Subtraction"];
  const maxNum = 20;
  const randomNumber = () => Math.round(Math.random() * maxNum);
  const getSign = operation === "Addition" ? "+" : "-";

  const ChooseOperation = () => {
    console.log("ChooseOperation");

    if (step1 && !step2) {
      return (
        <>
          <h2 className={styles.hdr}>Choose Challenge</h2>
          {operations.map((val) => (
            <button
              className={`${styles.btn} ${val === operation && styles.chosen}`}
              onClick={() => setOperation(val)}
              key={val}
            >
              {val}
            </button>
          ))}
        </>
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
    console.log([...results, { num1, num2, answer, userAnswer, operation }]);
    console.log(num1 + num2 === userAnswer ? "Right" : "Wrong");
    setResults([...results, { num1, num2, answer, userAnswer, operation }]);
    answerRef.current = 0;
  };

  const RenderQuesiton = () => {
    console.log("RenderQuestion");
    // if (step1 && step2) {
    if (step1 && true) {
      const num1 = randomNumber();
      const num2 = randomNumber();
      // const answer = checkAnswer();

      return (
        <section className={styles.subCont}>
          <form onSubmit={submit} className={styles.form}>
            <div className={styles.qstnCont}>
              <span className={styles.num}>{num1 > num2 ? num1 : num2}</span>
              <span className={styles.operation}>{getSign}</span>
              <span className={styles.num}>{num1 > num2 ? num2 : num1}</span>
              <span className={styles.equals}>=</span>
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

  const RenderTimer = ({ props }) => {
    const timer = (
      <section className={styles.container}>
        <Timer props={props} />
      </section>
    );
    return step1 ? timer : null;
  };

  const Results = () => {
    console.log("Results");
    const HTML = (
      <section className={styles.subCont}>
        <h3 className={styles.ResultsHdr}>Results</h3>
        <div className={styles.resultCont}>
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
    return results.length && userName.length ? HTML : null;
  };

  // const setStep2 = useCallback(() => setStep2, []);

  return (
    <>
      {/* {"Step1" + step1}
      <br />
      {"Step2" + step2}
      <br />
      <hr /> */}
      <div className={styles.container}>
        <section className={styles.subCont}>
          <h2 className={styles.hdr} onClick={() => setStep1(false)}>
            {step1 ? userName : "Maths"}
          </h2>
          <User props={{ setUserName, userName, setStep1, step1 }} />
        </section>
        <section className={styles.subCont}>
          <ChooseOperation />{" "}
        </section>

        <RenderQuesiton />
        <RenderTimer props={{ setStep2, step2 }} />
        <Results />
      </div>
    </>
  );
}

export default Maths;
