import React, { useEffect, useState, useRef } from "react";
import Loading from "../Loading";
import ImageList from "./ImageList";
import AnswerInput from "./AnswerInput";
import { createApi } from "unsplash-js";
import { Section } from "../../containers/Section";
import { animals } from "../../data/animals";

const unSplashAccessKey = "WwQoe_p8T_CLABx_Ay32MvDbK-FOc9vG-j43s2WpIdU";
const unsplash = createApi({ accessKey: unSplashAccessKey });

function Spelling({ submit, results, setIsError }) {
  console.log("Spelling");

  const [dataFetch, setDataFetch] = useState({
    data: [],
    loading: true,
  });
  const [answer, setAnswer] = useState([]);
  const answerRef = useRef(); // Will be the active input field the answer is entered into
  const indexRef = useRef(1); // Will keep track of the current index of the active input field
  const animalRef = useRef("");

  useEffect(() => {
    console.log("Spelling UE");
    console.log(new Date());
    const randomNum = Math.floor(Math.random() * animals.length);
    const randomAnimal = animals[randomNum];
    console.log(randomAnimal);

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
        });
        animalRef.current = randomAnimal;
        setAnswer(randomAnimal.substring(0, 1));
      })
      .catch((err) => {
        setIsError(true);
      });

    // // test search data below
    // console.log(searchResults);
    // setData(searchResults);
    // animalRef.current = randomAnimal;
    // setAnswer(randomAnimal.substring(0, 1));
  }, [results, setIsError]);

  // The answer is entered as an array instead of a string (adds complexity) TODO
  const handleAnswers = (val, index) => {
    const newAnswer = [...answer];
    newAnswer[index] = val;
    setAnswer(newAnswer);
  };

  return (
    <>
      <Section>
        {dataFetch.loading ? (
          <Loading />
        ) : (
          <>
            <ImageList data={dataFetch.data} />
            <AnswerInput
              answer={answer}
              animalRefVal={animalRef.current}
              results={results}
              handleAnswers={handleAnswers}
              answerRef={answerRef}
              indexRef={indexRef}
              submit={submit}
            />
          </>
        )}
      </Section>
    </>
  );
}

export default Spelling;
