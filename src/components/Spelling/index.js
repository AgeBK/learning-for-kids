import React, { useEffect, useState, useRef } from "react";
import Results from "../Results";
import Loading from "../Loading";
import ImageList from "./ImageList";
import AnswerInput from "./AnswerInput";
import { createApi } from "unsplash-js";
import { Section } from "../../containers/Section";
import { animals } from "../../data/animals";
import { searchResults } from "../../data/splashSearch"; // testing

const unSplashAccessKey = "WwQoe_p8T_CLABx_Ay32MvDbK-FOc9vG-j43s2WpIdU";
const unsplash = createApi({ accessKey: unSplashAccessKey });

const Spelling = ({ submit }) => {
  console.log("Spelling");

  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [results, setResults] = useState([]);
  const answerRef = useRef();
  const indexRef = useRef(1);
  const loadingRef = useRef(true);
  const animalRef = useRef("");

  useEffect(() => {
    console.log("Spelling UE");

    console.log(new Date());
    const randomNum = Math.floor(Math.random() * animals.length);
    const someAnimal = animals[randomNum];
    console.log(someAnimal);
    // loadingRef.current = true;

    // API search
    // setTimeout(() => {
    unsplash.search
      .getPhotos({
        query: someAnimal,
        perPage: 5,
      })
      .then((result) => {
        console.log(result.response.results);
        setData(result.response.results);
        animalRef.current = someAnimal;
        setAnswer(someAnimal.substring(0, 1));
        loadingRef.current = false;
      });
    // }, 2000);

    // // test search data below
    // console.log(searchResults);
    // setData(searchResults);
    // animalRef.current = someAnimal;
    // loadingRef.current = false;
    // setAnswer(someAnimal.substring(0, 1));
  }, [results]);

  // The answer is entered as an array instead of a string (adds complexity)
  const handleAnswers = (val, index) => {
    const newAnswer = [...answer];
    newAnswer[index] = val;
    setAnswer(newAnswer);
  };

  const RenderSpelling = () => (
    <>
      <Section>
        {loadingRef.current ? (
          <Loading />
        ) : (
          <>
            <ImageList data={data} />
            <AnswerInput
              answer={answer}
              animalRefVal={animalRef.current}
              results={results}
              setResults={setResults}
              handleAnswers={handleAnswers}
              answerRef={answerRef}
              indexRef={indexRef}
              submit={submit}
            />
          </>
        )}
      </Section>
      {/* <Results spellingResults={results} /> */}
    </>
  );

  return <RenderSpelling />;
};

export default Spelling;
