import { useState, useRef, useEffect } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import { RandomColour } from "../../containers/RandomColour";
import startBeeps from "../../audio/countdownStart.mp3";
import fiveLeft from "../../audio/5toGo.mp3";
import styles from "./Timer.module.css";

function Timer({ step2, setStep2, setResults, isError, finalise }) {
  // Workflow
  // =================
  // Press start button
  // Pre start phase: Ready set go displayed (preStart = true, isStart = false, step2 = false)
  // Start phase: Count down timer displayed (preStart = false, isStart = true, setStep2(true) (step2 in parent, shows questions)
  // step2 = true, start timer for questions
  // timer = 0, display finished, setStep2(false), finalise (finalise function in parent, complete stage of workflow)

  const startTime = 60;
  const [time, setTime] = useState(startTime);
  const countRef = useRef(startTime);
  const [preTime, setPreTime] = useState(0);
  const intervalIdRef = useRef(null);
  const audioRef = useRef(null);
  const ready = ["Ready", "Set", "Go!!!"];
  const [isPreStart, setIsPreStart] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [complete, setComplete] = useState(false);
  const secs = time % 60;

  useEffect(() => {
    if (isStart && !step2) {
      setStep2(true);
    }

    if (complete && step2) {
      setStep2(false);
      finalise();
    }
  }, [isStart, complete, step2, setStep2, finalise]);

  useEffect(() => {
    isError && resetVariables();
  }, [isError]);

  const reset = () => {
    // clear results (reset btn has been pressed, don't save to records)
    setResults([]);
    resetVariables();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const resetVariables = () => {
    // reset challenge variables ready to start again
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
    countRef.current = startTime;
    setComplete(true);
    setIsPreStart(true);
    setIsStart(false);
    setTime(startTime);
  };

  const checkTimer = () => {
    --countRef.current;
    let count = countRef.current;

    if (count === 5) {
      audioRef.current = new Audio(fiveLeft);
      audioRef.current.play();
    }

    count === 0 && resetVariables();
  };

  const startTimer = () => {
    intervalIdRef.current = setInterval(() => {
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

    intervalIdRef.current = setInterval(() => {
      setPreTime((prev) => prev + 1);
    }, 1000);
  };

  if (preTime === ready.length) {
    // pre-timer finished
    // set variables for challenge (step 2) - start countdown for quesitons
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
    setIsPreStart(false);
    setPreTime(0);
    setIsStart(true);
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
                <RandomColour>{ready[preTime]}</RandomColour>
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
          css={isStart ? "reset" : "btn"}
          onClick={isStart ? reset : startPreTimer}
        >
          {isStart ? "Reset" : "Start"}
        </Button>
      </div>
    </Section>
  );
}

export default Timer;
