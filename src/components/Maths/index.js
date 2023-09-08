import React, { useEffect, useState, useRef } from "react";
import styles from "./Maths.module.css";

function Maths() {
  const [results, setResults] = useState([]);
  const answerRef = useRef(0);
  const [operation, setOperation] = useState("Addition");
  const operations = ["Addition", "Subtraction"];
  const maxNum = 20;

  const randomNumber = () => Math.round(Math.random() * maxNum);
  const getSign = operation === "Addition" ? "+" : "-";

  const ChooseOperation = () => (
    <div className={styles.operationCont}>
      {operations.map((val) => (
        <button
          className={`${styles.btn} ${val === operation && styles.chosen}`}
          onClick={() => setOperation(val)}
          key={val}
        >
          {val}
        </button>
      ))}
    </div>
  );

  const submit = (num1, num2) => {
    const userAnswer = Number(answerRef.current.value);
    let answer = 0;
    switch (operation) {
      case "Addition":
        answer = num1 + num2;
        break;
      case "Subtraction":
        answer = num1 - num2;
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
    const num1 = randomNumber();
    const num2 = randomNumber();
    // const answer = checkAnswer();

    return (
      <form onSubmit={submit}>
        <div className={styles.qstnCont}>
          <span className={styles.num}>{num1 > num2 ? num1 : num2}</span>
          <span className={styles.operation}>{getSign}</span>
          <span className={styles.num}>{num1 > num2 ? num2 : num1}</span>
          <span className={styles.equals}>=</span>

          <input
            className={styles.answer}
            type="text"
            maxLength="2"
            ref={answerRef}
          />
        </div>
        <button className={styles.button} onClick={() => submit(num1, num2)}>
          Answer
        </button>
      </form>
    );
  };

  const Results = () => (
    <>
      <h3 className={styles.ResultsHdr}>Results</h3>
      {results.map(({ num1, num2, answer, userAnswer, operation }, ind) => (
        <div className={styles.resultCont}>
          <span className={styles.num}>Q{ind + 1}: </span>
          <span className={styles.num}>{num1}</span>
          <span className={styles.num}>{getSign}</span>
          <span className={styles.num}>{num2}</span>
          <span className={styles.num}> = </span>
          <span
            className={userAnswer === answer ? styles.correct : styles.wrong}
          >
            {userAnswer}
          </span>
        </div>
      ))}
    </>
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.hdr}>Maths</h2>
      <ChooseOperation />
      <RenderQuesiton />
      <Results />
    </section>
  );
}

export default Maths;
