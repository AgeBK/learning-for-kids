import React, { useEffect, useState, useRef } from "react";
import { Button } from "../../../containers/Button";
import correct from "../../../audio/correct.mp3";
import wrong from "../../../audio/wrong.mp3";
import styles from "./AnswerInput.module.css";

const AnswerInput = ({
  answer,
  animalRefVal,
  results,
  setResults,
  handleAnswers,
  answerRef,
  indexRef,
  submit,
}) => {
  const reAlph = new RegExp(/^[a-z]+$/);
  console.log(animalRefVal);
  // console.log(answer);
  // console.log(animalRefVal.split(""));

  useEffect(() => {
    // update focus each time a letter is entered
    answerRef.current && answerRef.current.focus();
  }, [answerRef, answer]);

  const onClick = (index) => (indexRef.current = index);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   indexRef.current = 1;
  //   const appropriateSound = new Audio(
  //     animalRefVal === answer.join("") ? correct : wrong
  //   );
  //   appropriateSound.play();
  //   setResults([
  //     ...results,
  //     { answer: animalRefVal, userAnswer: answer.join("") },
  //   ]);
  //   console.log(results);
  // };

  const onChange = (e, index) => {
    const { value } = e.target;
    // emualte tab press if value present and not last input box
    // shift tab?
    if (reAlph.test(value) && animalRefVal.length !== index + 1) {
      indexRef.current = index + 1;
    }
    handleAnswers(value, index);
  };

  const onKeyUp = (e, index) => {
    if (e.keyCode === 8) {
      // emulate backspace as it would work for an input field
      indexRef.current = index - 1;
      handleAnswers("", indexRef.current);
    }
  };

  if (animalRefVal.length > 0) {
    const result = animalRefVal.split("").map((val, ind) => {
      console.log(val);
      return (
        <span key={val + ind}>
          {ind === 0 ? (
            <span className={styles.answerInitial}>{val}</span>
          ) : (
            <input
              className={styles.answerInput}
              onChange={(e) => onChange(e, ind)}
              onKeyUp={(e) => onKeyUp(e, ind)}
              onClick={() => onClick(ind)}
              type="text"
              id={`input-${ind}`}
              value={answer[ind]}
              maxLength="1"
              ref={indexRef.current === ind ? answerRef : null}
            />
          )}
        </span>
      );
    });

    return (
      <form
        onSubmit={(e) => submit(e, animalRefVal, answer)}
        className={styles.form}
      >
        {result}
        <Button
          onClick={(e) => submit(e, animalRefVal, answer)}
          className={styles.btn}
        >
          Answer
        </Button>
      </form>
    );
  }
  return null;
};
export default AnswerInput;
