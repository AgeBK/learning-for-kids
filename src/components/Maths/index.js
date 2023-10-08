import React, { useRef } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import { RandomColour } from "../../containers/RandomColour";
import styles from "./Maths.module.css";

function Maths({ step1, step2, getSign, submit }) {
  // console.log("Maths");

  const answerRef = useRef("");
  const maxNum = 20;
  const randomNumber = () => Math.floor(Math.random() * maxNum);

  const handleSubmit = (e, num1, num2) => {
    e.preventDefault();
    let answer = 0;

    switch (getSign) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      default:
        break;
    }

    submit(answer, Number(answerRef.current.value), num1, num2);
    answerRef.current.value = "";
  };

  if (step1 && step2) {
    const [num1, num2] = [randomNumber(), randomNumber()].sort((a, b) =>
      a > b ? -1 : 1
    );

    return (
      <Section>
        <form
          onSubmit={(e) => handleSubmit(e, num1, num2)}
          className={styles.form}
        >
          <div className={styles.qstnCont}>
            <RandomColour>{num1}</RandomColour>
            <RandomColour>{getSign}</RandomColour>
            <RandomColour>{num2}</RandomColour>
            <span className={styles.equals}>
              <RandomColour>=</RandomColour>
            </span>
            <span className={styles.inputCont}>
              <input
                className={styles.input}
                type="number"
                maxLength="2"
                ref={answerRef}
                autoFocus
              />
            </span>
            <Button css="qstnBtn" onClick={(e) => handleSubmit(e, num1, num2)}>
              Answer
            </Button>
          </div>
        </form>
      </Section>
    );
  }

  return null;
}

export default Maths;
