import React, { useState, useRef, useEffect } from "react";
import { RandomColour } from "../../containers/RandomColour";

import startBeeps from "../../audio/countdownStart.mp3";
import fiveLeft from "../../audio/5toGo.mp3";
import styles from "./Timer.module.css";

function Timer({ props }) {
  console.log("Timer");
  console.log(props);

  const { step1, step2, setStep2, setStep3, setResults } = props;

  const startTime = 6;
  const [time, setTime] = useState(startTime);
  const timeRef = useRef();
  const secs = time % 60;

  const [preStart, setpreStart] = useState(0);
  const [isPreStart, setIsPreStart] = useState(false);
  const ready = ["Ready", "Set", "Go!!!"];

  const [start, setStart] = useState(false);
  const [complete, setComplete] = useState(false);

  // Workflow
  // =================
  // press start button
  // Ready set go displayed
  // preStart = false, start = true, step2 = false, setStep2(true) (step2 in parent, shows questions)
  // step2 = true, start timer for questions
  // timer = 0, display finished, setStep2(false), setStep3(true) (step3 in parent, complete stage of workflow)

  useEffect(() => {
    // 1: need UE to set state in parent
    if (start && !step2) {
      setStep2(true); // when this fires, start will be set to false (can't start timer here so in UE below) ???
    }
  }, [start, step2, setStep2]);

  useEffect(() => {
    // 2: need to start timer after setting step 2 (can't render parent and child at the same time)
    if (time === startTime && step2 && !complete) {
      startTimer();
    }
  }, [step2, time, complete]);

  useEffect(() => {
    if (complete && step2) {
      setStep2(false);
      setStep3(true);
    }
  }, [complete, step2, setStep2, setStep3]);

  const startTimer = () => {
    timeRef.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  };

  if (time === 5 && step2) {
    const fiveSecsToGo = new Audio(fiveLeft);
    fiveSecsToGo.play();
  }

  if (time === 0 && !complete) {
    // reset variables
    clearInterval(timeRef.current);
    timeRef.current = null;

    setIsPreStart(true);
    setStart(false);
    setComplete(true);
    setTime(startTime);
  }

  const startPreTimer = () => {
    // pre-timer, activates Ready set go countdown
    setIsPreStart(true);
    setComplete(false);
    setResults([]); // Reset previous results

    const appropriateSound = new Audio(startBeeps);
    appropriateSound.play();

    timeRef.current = setInterval(() => {
      setpreStart((prev) => prev + 1);
    }, 1000);
  };

  if (preStart === ready.length) {
    // pre-timer finished
    // set variables for challenge (step 2) - initiate countdown for quesitons
    clearInterval(timeRef.current);
    timeRef.current = null;

    setIsPreStart(false);
    setpreStart(0);
    setStart(true);
  }

  const Finished = () =>
    "Finished!!"
      .split("")
      .map((val, ind) => <RandomColour key={ind}>{val}</RandomColour>);

  const Time = () => (
    <div className={styles.subCont}>
      <div className={styles.timeCont}>
        {isPreStart ? (
          <div className={styles.ready}>
            {complete ? <Finished /> : ready[preStart]}
          </div>
        ) : (
          <>
            <span className={styles.time}>
              <RandomColour>{Math.trunc(time / 60)}</RandomColour>
            </span>
            <span>:</span>
            <span className={styles.time}>
              <RandomColour>{secs < 10 && 0}</RandomColour>
              <RandomColour>{secs}</RandomColour>
            </span>
          </>
        )}
      </div>
      <button className={styles.btn} onClick={() => startPreTimer(true)}>
        Start
      </button>
    </div>
  );

  return step1 ? <Time /> : null;
}

export default Timer;
