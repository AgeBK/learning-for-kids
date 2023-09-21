import React from "react";
import { Section } from "../../containers/Section";
// import { RandomColour } from "../../containers/RandomColour";
import styles from "./Challenge.module.css";

const Challenge = ({ props }) => {
  console.log("Challenge");

  const { step1, step2, operation, setOperation } = props;
  const operations = ["Addition", "Subtraction"];

  if (step1 && !step2) {
    return (
      <Section>
        <h3>Choose Challenge</h3>
        <div className={styles.btnCont}>
          {operations.map((val) => (
            <button
              className={val === operation ? styles.selected : null}
              onClick={() => setOperation(val)}
              key={val}
            >
              {val}
            </button>
          ))}
        </div>
      </Section>
    );
  }

  return null;
};

export default Challenge;
