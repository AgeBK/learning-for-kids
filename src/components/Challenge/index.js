import React from "react";
import { Section } from "../../containers/Section";
// import { RandomColour } from "../../containers/RandomColour";
import styles from "./Challenge.module.css";

const Challenge = ({ props }) => {
  console.log("Challenge");
  const { step1, step2, operation, setOperation } = props;
  const operations = ["Addition", "Subtraction"];
  const hdr = "Choose Challenge";
  const SelectChallenge = () => (
    <Section>
      <h3 className={styles.hdr}>
        {hdr}
        {/* {hdr.split("").map((val, ind) => (
          <RandomColour key={ind}>{val}</RandomColour>
        ))} */}
      </h3>
      <div className={styles.btnCont}>
        {operations.map((val) => (
          <button
            className={`${styles.btn} ${val === operation && styles.selected}`}
            onClick={() => setOperation(val)}
            key={val}
          >
            {val}
          </button>
        ))}
      </div>
    </Section>
  );

  return step1 && !step2 ? <SelectChallenge /> : null;
};

export default Challenge;
