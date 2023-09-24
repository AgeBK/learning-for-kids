import React, { useEffect, useState, useRef } from "react";
import Results from "../Results";
import Loading from "../Loading";
import { Button } from "../../containers/Button";
import { createApi } from "unsplash-js";
import { Section } from "../../containers/Section";
import { animals } from "../../data/animals";
import { searchResults } from "../../data/splashSearch";
import styles from "./Spelling.module.css";
import right from "../../audio/correct.mp3";
import wrong from "../../audio/wrong.mp3";
const unSplashAccessKey = "WwQoe_p8T_CLABx_Ay32MvDbK-FOc9vG-j43s2WpIdU";
const unSplashSecretKey = "6kySiTH4Fqe2KUlMQhAJ9d-fQUmOczykiXtUoLtQbqU";

// const unsplash = new Unsplash({
//   accessKey: unSplashAccessKey,
// });
const unsplash = createApi({ accessKey: unSplashAccessKey });

const Spelling = () => {
  console.log("Spelling");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [results, setResults] = useState([]);
  const [randomAnimal, setRandomAnimal] = useState("");
  const answerRef = useRef();
  const indexRef = useRef(1);
  const reAlph = new RegExp(/^[a-z]+$/);

  // console.log(updateRes);

  useEffect(() => {
    // if (step1 && challenge === "Spelling") {
    console.log("Spelling UE");

    console.log(new Date());
    const randomNum = Math.floor(Math.random() * animals.length);
    const someAnimal = animals[randomNum];
    console.log(someAnimal);
    // API search
    // unsplash.search
    //   .getPhotos({
    //     query: someAnimal,
    //     perPage: 5,
    //   })
    //   .then((result) => {
    //     console.log(result.response.results);
    //     setData(result.response.results);
    //     setRandomAnimal(someAnimal);
    //     setAnswer(someAnimal.substring(0, 1));
    //     setLoading(false);
    //   });

    // test search data below
    console.log(searchResults);
    setData(searchResults);
    setRandomAnimal(someAnimal);
    setAnswer(someAnimal.substring(0, 1));
    //}
  }, [results]);

  useEffect(() => {
    if (answerRef.current && answerRef.current.children[indexRef.current])
      answerRef.current.children[indexRef.current].focus();
  }, [answer, results]);

  const onChange = (e, index) => {
    console.log("onChange");
    const { value } = e.target;
    // console.log(value);
    // console.log(index);
    // console.log(randomAnimal.length);

    // emualte tab press if value present and not last input box
    // shift tab?
    if (reAlph.test(value) && randomAnimal.length !== index + 1) {
      indexRef.current = index + 1;
    }
    handleEnableAnswers(value, index);
  };

  const onKeyUp = (e, index) => {
    if (e.keyCode === 8) {
      // emulate backspace as it would work for an input field
      indexRef.current = index - 1;
      handleEnableAnswers("", indexRef.current);
    }
  };

  // The answer is entered as an array instead of a string (adds complexity)
  const handleEnableAnswers = (val, index) => {
    const newAnswer = [...answer];
    newAnswer[index] = val;
    setAnswer(newAnswer);
  };

  // change index to position in array clicked
  const onClick = (index) => (indexRef.current = index);

  const onSubmit = (e) => {
    e.preventDefault();
    indexRef.current = 1;
    const appropriateSound = new Audio(
      randomAnimal === answer.join("") ? right : wrong
    );
    console.log(randomAnimal === answer.join(""));
    appropriateSound.play();
    setResults([
      ...results,
      { answer: randomAnimal, userAnswer: answer.join("") },
    ]);
    console.log(results);
  };

  const AnswerInput = () => {
    console.log("AnswerInput");
    console.log(answer);
    console.log(randomAnimal.split(""));
    if (randomAnimal.length > 0) {
      const result = randomAnimal.split("").map((val, index) => {
        console.log(val);
        return (
          <>
            {index === 0 ? (
              <span className={styles.answerInitial} key={index}>
                {val}
              </span>
            ) : (
              <input
                className={styles.answerInput}
                onChange={(e) => onChange(e, index)}
                onKeyUp={(e) => onKeyUp(e, index)}
                onClick={() => onClick(index)}
                type="text"
                id={`input-${index}`}
                value={answer[index]}
                key={index}
                maxLength="1"
              />
            )}
          </>
        );
      });

      return (
        <form onSubmit={onSubmit} className={styles.form}>
          <span className={styles.answerCont} ref={answerRef}>
            {result}
          </span>
          <Button onClick={onSubmit} className={styles.btn}>
            Answer
          </Button>
        </form>
      );
    }
    return null;
  };

  const ImageList = () => {
    if (data.length > 0) {
      return (
        <ul className={styles.list}>
          {data.map(({ id, urls: { thumb }, alt_description }) => {
            return (
              <li className={styles.listItem} key={id}>
                <img src={thumb} alt={alt_description} />
              </li>
            );
          })}
        </ul>
      );
    }
    return null;
  };

  const HTML = () => (
    <>
      <Section>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ImageList />
            <AnswerInput />
          </>
        )}
      </Section>
      <Results spellingResults={results} />
    </>
  );

  return <HTML />;
};

export default Spelling;
