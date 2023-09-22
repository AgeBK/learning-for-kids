import React, { useState, useRef, useEffect, memo } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import { RandomColour } from "../../containers/RandomColour";
import startBeeps from "../../audio/countdownStart.mp3";
import fiveLeft from "../../audio/5toGo.mp3";
import styles from "./Timer.module.css";

function Timer({ step1, step2, step3, setStep2, setStep3, setResults }) {
  console.log("Timer");

  // Workflow
  // =================
  // press start button
  // Pre start phase: Ready set go displayed (preStart = true, start = false, step2 = false)
  // Start phase: Count down timer displayed (preStart = false, start = true, setStep2(true) (step2 in parent, shows questions)
  // step2 = true, start timer for questions
  // timer = 0, display finished, setStep2(false), setStep3(true) (step3 in parent, complete stage of workflow)

  const startTime = 1111;
  const [time, setTime] = useState(startTime);
  const timeRef = useRef();
  const countRef = useRef(startTime);
  const secs = time % 60;

  const [preStart, setpreStart] = useState(0);
  const [isPreStart, setIsPreStart] = useState(false);
  const ready = ["Ready", "Set", "Go!!!"];

  const [start, setStart] = useState(false);
  const [complete, setComplete] = useState(false);

  const checkTimer = () => {
    --countRef.current;
    let count = countRef.current;
    console.log(count);

    if (count === 5) {
      const fiveSecsToGo = new Audio(fiveLeft);
      fiveSecsToGo.play();
    }

    count === 0 && resetVariables();
  };

  useEffect(() => {
    // set steps 2/3 here: get warnings in synchronous functions
    if (start && !step2) {
      setStep2(true);
    }

    if (complete && step2) {
      setStep2(false);
      setStep3(true);
    }
  }, [start, complete, step2, setStep2, setStep3]);

  const reset = () => {
    // clear results (reset btn has been pressed, don't save to records)
    setResults([]);
    resetVariables();
  };

  const resetVariables = () => {
    // reset challenge variables ready to start again
    clearInterval(timeRef.current);
    timeRef.current = null;

    countRef.current = startTime;
    setComplete(true);
    setIsPreStart(true);
    setStart(false);
    setTime(startTime);
  };

  const startTimer = () => {
    timeRef.current = setInterval(() => {
      setTime((prev) => prev - 1);
      checkTimer();
    }, 1000);
  };

  const startPreTimer = () => {
    // pre-timer, activates Ready Set Go countdown
    setIsPreStart(true);
    setComplete(false);
    setResults([]); // Reset previous results here

    const appropriateSound = new Audio(startBeeps);
    appropriateSound.play();

    timeRef.current = setInterval(() => {
      setpreStart((prev) => prev + 1);
    }, 1000);
  };

  if (preStart === ready.length) {
    // pre-timer finished
    // set variables for challenge (step 2) - start countdown for quesitons
    clearInterval(timeRef.current);
    timeRef.current = null;

    setIsPreStart(false);
    setpreStart(0);
    setStart(true);
    startTimer();
  }

  const Time = () => (
    <Section>
      <div className={styles.subCont}>
        <div className={styles.timeCont}>
          {isPreStart ? (
            <div className={styles.ready}>
              {complete ? (
                <RandomColour>Finished!!</RandomColour>
              ) : (
                <RandomColour>{ready[preStart]}</RandomColour>
              )}
            </div>
          ) : (
            <>
              <span className={styles.time}>
                <RandomColour>{Math.trunc(time / 60)}</RandomColour>
              </span>
              <span>:</span>
              <span className={styles.time}>
                <RandomColour>{secs.toString().padStart(2, "0")}</RandomColour>
              </span>
            </>
          )}
        </div>
        <Button
          css={start ? "reset" : "btn"}
          onClick={start ? reset : startPreTimer}
        >
          {start ? "Reset" : "Start"}
        </Button>
      </div>
    </Section>
  );

  return step1 ? <Time /> : null;
}

export default memo(Timer);
