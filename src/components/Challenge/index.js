import React, { memo } from "react";
import { Button } from "../../containers/Button";
import { Section } from "../../containers/Section";
import styles from "./Challenge.module.css";

function Challenge({
  challenge,
  setChallenge,
  operation,
  setOperation,
  isMaths,
  setResults,
  setPosition,
  setSpellingBG,
}) {
  // console.log("Challenge");
  const challenges = ["Maths", "Spelling"];
  const operations = ["Addition", "Subtraction"];

  const handleClick = (val) => {
    setSpellingBG(val === "Spelling" ? true : false);
    setChallenge(val);
    setPosition(null);
    setResults([]);
  };

  return (
    <>
      <Section>
        <h3 className={styles.hdr}>Choose Challenge:</h3>
        {challenges.map((val) => (
          <span key={val}>
            <Button
              css={val === challenge ? "selected" : null}
              onClick={() => handleClick(val)}
            >
              {val}
            </Button>
          </span>
        ))}
        {isMaths && (
          <>
            <div className={styles.divider}></div>
            {operations.map((val) => (
              <span key={val}>
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
}

export default memo(Challenge);
