import React from "react";
import { Section } from "../../containers/Section";
import Img from "../../img/sad.png";
import styles from "./Error.module.css";
import btnStyles from "../../containers/Button/Button.module.css";

function Error() {
  return (
    <Section>
      <img src={Img} alt="Error has occured" />
      <h2 className={styles.hdr}>
        Whoops!!
        <br />
        <span>Something has gone wrong</span>
      </h2>
      <div className={styles.sorry}>Sorry for the inconvenience</div>
      <a href="/" className={`${styles.link} ${btnStyles.button}`}>
        Try restarting
      </a>
    </Section>
  );
}

export default Error;
