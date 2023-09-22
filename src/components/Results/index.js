import React, { memo } from "react";
import { Section } from "../../containers/Section";
import styles from "./Results.module.css";

function Results({ getSign, cachedResults }) {
  console.log("Results");
  // const { getSign } = props;
  const total = cachedResults.length;
  const correct = cachedResults.filter(
    ({ answer, userAnswer }) => answer === userAnswer
  ).length;
  const wrong = total - correct;
  const percent = Math.round((correct / total) * 100);

  if (cachedResults.length) {
    return (
      <Section>
        <h3 className={styles.resultsHdr}>Results</h3>
        <div className={styles.resultsSubHdrs}>
          <h4 className={styles.answered}>Answered: {cachedResults.length}</h4>
          <h4 className={styles.correct}>Correct: {correct}</h4>
          <h4 className={styles.wrong}>Wrong: {wrong}</h4>
          <h4 className={styles.percent}>({percent}%)</h4>
        </div>
        <hr />
        <div className={styles.resultCont}>
          <br />
          {cachedResults.map(
            ({ num1, num2, answer, userAnswer, operation }, ind) => (
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
            )
          )}
        </div>
      </Section>
    );
  }

  return null;
}

export default memo(Results);
