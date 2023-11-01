import { Section } from "../../containers/Section";
import styles from "./Results.module.css";

function Results({ getSign, results, isMaths }) {
  if (results.length) {
    const total = results.length;
    const correct = results.filter(
      ({ answer, userAnswer }) => answer === userAnswer
    ).length;
    const wrong = total - correct;
    const percent = Math.round((correct / total) * 100);

    return (
      <Section>
        <h3>Results</h3>
        <div className={styles.resultsSubHdrs}>
          <h4>Answered: {total}</h4>
          <h4 className={styles.correct}>Correct: {correct}</h4>
          <h4 className={styles.wrong}>Wrong: {wrong}</h4>
          <h4 className={styles.percent}>({percent}%)</h4>
        </div>
        <hr />
        <div className={styles.resultCont}>
          {results.map(({ num1, num2, answer, userAnswer }, ind) => (
            <div className={styles.results} key={ind}>
              <span>Q{ind + 1}: </span>
              {isMaths && (
                <>
                  <span>{num1}</span>
                  <span>{getSign}</span>
                  <span>{num2}</span>
                  <span> = </span>
                </>
              )}
              <span
                className={
                  userAnswer === answer ? styles.correct : styles.wrong
                }
              >
                {userAnswer}
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
