import React, { useState, useRef, useEffect } from "react";
import styles from "./Timer.module.css";

function Timer({ props }) {
  console.log("Timer");
  console.log(props);

  const { setStep2, step2, setStep3 } = props;

  const startTime = 60;
  const [time, setTime] = useState(3);
  const timeRef = useRef();
  const secs = time % 60;

  const [preTime, setPreTime] = useState(0);
  const [isPreTime, setIsPreTime] = useState(false);
  const ready = ["Ready", "Set", "Go!!!"];
  const [start, setStart] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    console.log("UE");
    if (start || step2) {
      timeRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      setStep2(true); // sets state in parent/shows questions (this causes Timer to rerender which causes problems??)
    }
    if (complete) {
      setStep2(false);
      setStep3(true);
    }
    return () => clearInterval(timeRef.current);
  }, [start, step2, setStep2, setStep3, complete]);

  const startTimer = () => setStart(true);

  if (time === 0) {
    // reset variables
    clearInterval(timeRef.current);
    timeRef.current = null;
    setIsPreTime(true);
    setTime(startTime);
    setComplete(true);
    setStart(false);
    //       setStep3(true)
  }

  const startPreTimer = () => {
    // pre-timer, activates Ready set go countdown
    setIsPreTime(true);
    setComplete(false);

    timeRef.current = setInterval(() => {
      setPreTime((prev) => prev + 1);
    }, 1000);
  };

  if (preTime === ready.length) {
    // pre-timer finished, initiate countdown for quesitons
    clearInterval(timeRef.current);
    timeRef.current = null;

    setIsPreTime(false);
    setPreTime(0);
    startTimer();
  }

  return (
    <div className={styles.subCont}>
      <button className={styles.btn} onClick={() => startPreTimer(true)}>
        Start
      </button>
      {isPreTime ? (
        <div className={styles.ready}>
          {complete ? "Finished!!" : ready[preTime]}
        </div>
      ) : (
        <div className={styles.timeCont}>
          <span className={styles.time}>{Math.trunc(time / 60)}</span>
          <span>:</span>
          <span className={styles.time}>
            {secs < 10 && 0}
            {secs}
          </span>
        </div>
      )}
    </div>
  );
}

export default Timer;
