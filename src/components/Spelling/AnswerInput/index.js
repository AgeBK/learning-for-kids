import React, { useEffect } from "react";
import { Button } from "../../../containers/Button";
import styles from "./AnswerInput.module.css";

const AnswerInput = ({
  answer,
  animalRefVal,
  handleAnswers,
  answerRef,
  indexRef,
  submit,
}) => {
  console.log("AnswerInput");
  const reAlph = new RegExp(/^[a-z]+$/);
  console.log(animalRefVal);

  useEffect(() => {
    // update focus each time a letter is entered
    answerRef.current && answerRef.current.focus();
  }, [answerRef, answer]);

  const onClick = (index) => (indexRef.current = index);

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
    // emulate backspace as it would work for an input field
    if (e.keyCode === 8) {
      indexRef.current = index - 1;
      handleAnswers("", indexRef.current);
    }
  };

  const handleSubmit = (e) => {
    indexRef.current = 1;
    submit(e, animalRefVal, answer.join(""));
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
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        {result}
        <Button onClick={(e) => handleSubmit(e)} className={styles.btn}>
          Answer
        </Button>
      </form>
    );
  }

  return null;
};

export default AnswerInput;
