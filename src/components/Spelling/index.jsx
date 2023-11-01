import { useEffect, useState, useRef } from "react";
import { Loading } from "../Loading";
import ImageList from "./ImageList";
import AnswerInput from "./AnswerInput";
import { createApi } from "unsplash-js";
import { Section } from "../../containers/Section";
import { words } from "../../data/words";

const unSplashAccessKey = "WwQoe_p8T_CLABx_Ay32MvDbK-FOc9vG-j43s2WpIdU";
const unsplash = createApi({ accessKey: unSplashAccessKey });

function Spelling({ submit, results, setIsError }) {
  const [dataFetch, setDataFetch] = useState({
    data: [],
    loading: true,
    wordToSpell: "",
  });
  const [userAnswer, setUserAnswer] = useState([]); // the users answer updated each letter press / using array (can enter answer in any order)
  const answerRef = useRef(); // the active input field the answer is entered into
  const indexRef = useRef(1); // the current index of the input fields

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * words.length);
    const randomAnimal = words[randomNum];
    // API search
    unsplash.search
      .getPhotos({
        query: randomAnimal,
        perPage: 5,
      })
      .then(({ response: { results } }) => {
        setDataFetch({
          data: [...results],
          loading: false,
          wordToSpell: randomAnimal,
        });
        setUserAnswer([randomAnimal.substring(0, 1)]);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [results, setIsError]); // run this each time results is updated

  const handleAnswers = (val, index) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = val;
    setUserAnswer(newAnswer);
  };

  const { data, loading, wordToSpell } = dataFetch;

  return (
    <Section>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ImageList data={data} />
          <AnswerInput
            userAnswer={userAnswer}
            wordToSpell={wordToSpell}
            handleAnswers={handleAnswers}
            answerRef={answerRef}
            indexRef={indexRef}
            submit={submit}
          />
        </>
      )}
    </Section>
  );
}

export default Spelling;
