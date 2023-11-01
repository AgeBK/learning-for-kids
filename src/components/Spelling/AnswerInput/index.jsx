import { useEffect } from "react";
import { Button } from "../../../containers/Button";
import styles from "./AnswerInput.module.css";

function AnswerInput({
  userAnswer,
  wordToSpell,
  handleAnswers,
  answerRef,
  indexRef,
  submit,
}) {
  useEffect(() => {
    // update focus each time a letter is entered
    answerRef.current && answerRef.current.focus();
  }, [answerRef, userAnswer]);

  const onClick = (index) => (indexRef.current = index);

  const onChange = ({ target: { value } }, index) => {
    // emualte tab press if value present and not last input box
    if (wordToSpell.length !== index + 1) {
      indexRef.current = index + 1;
    }
    handleAnswers(value, index);
  };

  const onKeyUp = ({ keyCode }, index) => {
    // emulate backspace as it would work for an input field/unless its the first input field
    if (keyCode === 8 && index > 1) {
      indexRef.current = index - 1;
      handleAnswers("", indexRef.current);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    indexRef.current = 1;
    submit(wordToSpell, userAnswer.join(""));
  };

  if (wordToSpell.length) {
    const AnswerFields = () =>
      wordToSpell
        .split("")
        .map((val, ind) => (
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
                value={userAnswer[ind] || ""}
                maxLength="1"
                ref={indexRef.current === ind ? answerRef : null}
              />
            )}
          </span>
        ));

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <AnswerFields />
        <Button onClick={handleSubmit} className={styles.btn}>
          Answer
        </Button>
      </form>
    );
  }

  return null;
}

export default AnswerInput;
