import React, { useState, useRef, useEffect, memo } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import { RandomColour } from "../../containers/RandomColour";
import startBeeps from "../../audio/countdownStart.mp3";
import fiveLeft from "../../audio/5toGo.mp3";
import styles from "./Timer.module.css";

function Timer({
  step2,
  setStep2,
  setStep3,
  setResults,
  isError,
}) {
  // Workflow
  // =================
  // press start button
  // Pre start phase: Ready set go displayed (preStart = true, start = false, step2 = false)
  // Start phase: Count down timer displayed (preStart = false, start = true, setStep2(true) (step2 in parent, shows questions)
  // step2 = true, start timer for questions
  // timer = 0, display finished, setStep2(false), setStep3(true) (step3 in parent, complete stage of workflow)

  const startTime = 10;
  const [time, setTime] = useState(startTime);
  const timeRef = useRef();
  const countRef = useRef(startTime);
  const audioRef = useRef(null);
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
      audioRef.current = new Audio(fiveLeft);
      console.log(audioRef.current);
      audioRef.current.play();
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

  useEffect(() => {
    isError && resetVariables();
  }, [isError]);

  const reset = () => {
    // clear results (reset btn has been pressed, don't save to records)
    setResults([]);
    resetVariables();
  };

  const resetVariables = () => {
    // reset challenge variables ready to start again
    clearInterval(timeRef.current);
    timeRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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
    setResults([]);
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

  return (
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
}

export default memo(Timer);
