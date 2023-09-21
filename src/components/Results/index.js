import React from "react";
import { Section } from "../../containers/Section";
import styles from "./Results.module.css";

function Results({ props }) {
  console.log("Results");

  const { results, getSign } = props;
  const total = results.length;
  const correct = results.filter(
    ({ answer, userAnswer }) => answer === userAnswer
  ).length;
  const wrong = total - correct;
  const percent = Math.round((correct / total) * 100);

  if (results.length) {
    return (
      <Section>
        <h3 className={styles.resultsHdr}>Results</h3>
        <div className={styles.resultsSubHdrs}>
          <h4 className={styles.answered}>Answered: {results.length}</h4>
          <h4 className={styles.correct}>Correct: {correct}</h4>
          <h4 className={styles.wrong}>Wrong: {wrong}</h4>
          <h4 className={styles.percent}>({percent}%)</h4>
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
                {userAnswer}{" "}
                {userAnswer !== answer && (
                  <span className={styles.correct}>({answer})</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return null;
}

export default Results;
