import React, { useEffect, useState, useRef, useCallback } from "react";
import User from "../User";
import Timer from "../Timer";
import Records from "../Records";
import styles from "./Maths.module.css";

function Maths() {
  const [userName, setUserName] = useState("");
  const [step1, setStep1] = useState(false); // step 1: A name must be entered, then timer will display
  const [step2, setStep2] = useState(false); // step 2: Start. After pre-timer (Ready, set, go) runs, the questions will be presented
  const [step3, setStep3] = useState(false); // step 3: Completed. After normal timer has reached zero
  const answerRef = useRef(0); // store users answer
  const [results, setResults] = useState([]); // store questions and answers for current challenge

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
    if (step1 && step2) {
      // if (step1 && true) {
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
    return step2 ? HTML : null;
  };

  // const setStep2 = useCallback(() => setStep2, []); TODO:// LOOK into this

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
            {step1 && userName}
          </h2>
          <User props={{ setUserName, userName, setStep1, step1 }} />
        </section>
        <section className={styles.subCont}>
          <ChooseOperation />
        </section>
        <RenderQuesiton />
        <RenderTimer props={{ setStep2, step2, setStep3 }} />
        <Results />
        <Records props={{ results, userName, operation }} />
      </div>
    </>
  );
}

export default Maths;
