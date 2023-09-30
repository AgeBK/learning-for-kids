import React, { memo } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import styles from "./Challenge.module.css";

const Challenge = ({
  step1,
  step2,
  challenge,
  setChallenge,
  operation,
  setOperation,
  isMaths,
}) => {
  console.log("Challenge");
  const challenges = ["Maths", "Spelling"];
  const operations = ["Addition", "Subtraction"];

  // if (step1 && !step2) {
  return (
    <>
      <Section>
        <h3 className={styles.hdr}>Choose Challenge:</h3>
        {challenges.map((val) => (
          <span className={styles.btn} key={val}>
            <Button
              css={val === challenge ? "selected" : null}
              onClick={() => setChallenge(val)}
            >
              {val}
            </Button>
          </span>
        ))}
        {isMaths && (
          <>
            <div className={styles.divider}></div>
            {operations.map((val) => (
              <span className={styles.btn} key={val}>
                <Button
                  css={val === operation ? "selected" : null}
                  onClick={() => setOperation(val)}
                >
                  {val}
                </Button>
              </span>
            ))}
          </>
        )}
      </Section>
    </>
  );
  //}

  // return null;
};

export default memo(Challenge);
