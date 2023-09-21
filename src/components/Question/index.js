import React, { useRef } from "react";
import { Section } from "../../containers/Section";
import { RandomColour } from "../../containers/RandomColour";
import styles from "./Question.module.css";

const Question = ({ props }) => {
  console.log("Question");

  const { step1, step2, getSign, submit } = props;
  const answerRef = useRef("");
  const maxNum = 20;
  const randomNumber = () => Math.floor(Math.random() * maxNum);

  const handleSubmit = (e, num1, num2) => {
    e.preventDefault();
    submit(num1, num2, answerRef.current.value);
    answerRef.current.value = "";
  };

  if (step1 && step2) {
    const num1 = randomNumber();
    const num2 = randomNumber();

    return (
      <Section>
        <form
          onSubmit={(e) => handleSubmit(e, num1, num2)}
          className={styles.form}
        >
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
            <button
              className={styles.btn}
              onClick={(e) => handleSubmit(e, num1, num2)}
            >
              Answer
            </button>
          </div>
        </form>
      </Section>
    );
  }

  return null;
};

export default Question;
